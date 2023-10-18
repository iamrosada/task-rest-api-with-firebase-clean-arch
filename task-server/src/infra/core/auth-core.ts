import { SignInWithGoogleAuthUseCase } from "../../application/usecase/singn-in-with-google";
import { SignInWithGoogleAuthController } from "../controller/auth-controller";
import FirebaseAuthGoogleRepository from "../repository/firebase-google-auth-repository";

/**
 * Iniciar Repository
 */
const AuthRepo = new FirebaseAuthGoogleRepository();

/**
 * Iniciamos casos de uso
 */

const signInUseCase = new SignInWithGoogleAuthUseCase(AuthRepo)



/**
 * Iniciar task Controller
 */

 const signInWithGoogleAuthCtrl = new SignInWithGoogleAuthController(signInUseCase);


export { signInWithGoogleAuthCtrl}