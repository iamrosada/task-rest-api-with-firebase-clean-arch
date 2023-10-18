import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { AuthRepository } from "../../application/repository/auth-repository";
import {
  app,
  createUserWithEmailAndPassword,
  db,
  getAuth,
  googleProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "../database/firebase/firebase";
import { Auth, signOut } from "firebase/auth";
import { OutPutUserAuth, UserOutputDto } from "../dto/dto";
import { authSchema } from "../validation/schema";

class FirebaseAuthGoogleRepository implements AuthRepository {
  public authByGoogle:Auth;
  constructor() {
        this.authByGoogle = getAuth(app);

  }


  async logInWithEmailAndPassword(auth: UserOutputDto): Promise<OutPutUserAuth> {
    try {
      const validatedData = authSchema.parse(auth);
      if(!validatedData){
        throw Error("The data is incorrect, please verify email and password")
      }
      const emailExistsQuery = query(collection(db, "users"), where("email", "==", validatedData.email));
      const emailExistsSnapshot = await getDocs(emailExistsQuery);
  
      if (emailExistsSnapshot.empty) {
        throw new Error("Email not found. Please check your email address or register a new account.");
      }
  
      const response = await signInWithEmailAndPassword(this.authByGoogle, validatedData.email, validatedData.password);
      return {
        accessToken: response.user?.refreshToken
      };
    } catch (err) {
      console.error(err);
      console.log(err.message);
      throw err;
    }
  }

  async registerWithEmailAndPassword(auth: UserOutputDto): Promise<OutPutUserAuth> {
    try {
      const validatedData = authSchema.parse(auth);
      if (!validatedData) {
        throw new Error("The data is incorrect, please verify email and password");
      }
  
      const emailExistsQuery = query(collection(db, "users"), where("email", "==", validatedData.email));
      const emailExistsSnapshot = await getDocs(emailExistsQuery);
  
      if (emailExistsSnapshot.docs.length > 0) {
        throw new Error("Email already in use. Please choose a different email address.");
      }
  
      const res = await createUserWithEmailAndPassword(this.authByGoogle, validatedData.email, validatedData.password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        email: validatedData.email,
        password: validatedData.password,
        uuid: auth.uuid,
        authProvider: "local",
      });
  
      return {
        accessToken: user?.refreshToken
      };
    } catch (error) {
      console.error("Error during registration:", error);
  
      if (error.code === "auth/weak-password") {
        throw new Error("Weak password: The password must be at least 6 characters.");
      } else if (error.code === "auth/invalid-email") {
        throw new Error("Invalid email: The provided email is not valid.");
      } else {
        throw error;
      }
    }
  }
  
 
  async signInWithGoogle(): Promise<void> {
    try {
      const res = await signInWithPopup(this.authByGoogle, googleProvider);
      console.log(res,"with goooogle--->")
      const user = res.user;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
        });
      }
    } catch (err) {
      console.error(err);
      console.log(err.message);
    }
  }

  async sendPasswordReset(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.authByGoogle, email);
      console.log("Password reset link sent!");
    } catch (err) {
      console.error(err);
      console.log(err.message);
    }
  }

  async logout(): Promise<void> {
    signOut(this.authByGoogle);
  }
}

export default FirebaseAuthGoogleRepository;
