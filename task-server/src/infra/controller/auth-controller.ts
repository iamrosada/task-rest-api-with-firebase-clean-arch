import { SignInWithGoogleAuthUseCase } from "../../application/usecase/singn-in-with-google";

export class SignInWithGoogleAuthController {
  constructor(private signInWithGoogleAuthUseCase: SignInWithGoogleAuthUseCase) {}
  
  public signInWithGoogle = async () => {
    const response = await this.signInWithGoogleAuthUseCase.signInWithGoogle();
    return response;
  };

  public logInWithEmailAndPassword = async(email: string, password: string) => {
    const response = await this.signInWithGoogleAuthUseCase.logInWithEmailAndPassword(email, password);
    return response;
  };

  public registerWithEmailAndPassword = async (
    email: string,
    password: string,
  ) => {
    console.log(email, password,"SignInWithGoogleAuthController->recebendo")
    const response = await this.signInWithGoogleAuthUseCase.registerWithEmailAndPassword(
       email, password
    );
    return response 
  };

  public sendPasswordReset = async (email: string) => {
    const response = await this.signInWithGoogleAuthUseCase.sendPasswordReset(email);
    return response;
  };

  public logout = async () => {
    await this.signInWithGoogleAuthUseCase.logout();
    
  };
}