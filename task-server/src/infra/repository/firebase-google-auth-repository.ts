import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { AuthRepository } from "../../application/repository/auth-repository";
import { AuthEntity } from "../../domain/authentication";
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
import admin from "../database/config/firebase-config";
import { OutPutUserAuth, UserOutputDto } from "../dto/dto";

class FirebaseAuthGoogleRepository implements AuthRepository {
  public authByGoogle:Auth;
  constructor() {
        this.authByGoogle = getAuth(app);

  }


  async logInWithEmailAndPassword(auth: UserOutputDto): Promise<OutPutUserAuth> {
    const emailExistsQuery = query(collection(db, "users"), where("email", "==", auth.email));
    const emailExistsSnapshot = await getDocs(emailExistsQuery);
  
    // console.log(auth,"funcionada")
    if (emailExistsSnapshot.empty) {
      throw new Error("Email not found. Please check your email address or register a new account.");
    }
      try {
      const response = await signInWithEmailAndPassword(this.authByGoogle, auth.email, auth.password);
      // console.log(auth,"response", response)

        return {
        accessToken: response.user?.refreshToken
      };

    } catch (err) {
      console.error(err);
      console.log(err.message);
      throw err; // Re-throw the error

    }
  }
  async registerWithEmailAndPassword(auth: UserOutputDto): Promise<OutPutUserAuth> {
    const emailExistsQuery = query(collection(db, "users"), where("email", "==", auth.email));
    const emailExistsSnapshot = await getDocs(emailExistsQuery);
  
    if (emailExistsSnapshot.docs.length > 0) {
      throw new Error("Email already in use. Please choose a different email address.");
    }
  
    try {
      const res = await createUserWithEmailAndPassword(this.authByGoogle, auth.email, auth.password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        email: auth.email,
        password: auth.password,
        uuid: auth.uuid,
        authProvider: "local",
      });
      return {
        accessToken: user?.refreshToken
      };
    } catch (err) {
      console.error(err);
      console.log(err.message);
      throw err; // Re-throw the error

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
