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

  public registerWithEmailAndPassword = async (email: string, password: string) => {
    console.log(email, password, "SignInWithGoogleAuthController->recebendo");
  
    try {
      const response = await this.signInWithGoogleAuthUseCase.registerWithEmailAndPassword(email, password);
      return response;
    } catch (error) {
      if (error.code === "auth/weak-password") {
        throw new Error("Senha fraca: A senha deve conter pelo menos 6 caracteres.");
      } else if (error.code === "auth/email-already-in-use") {
        throw new Error("E-mail já em uso: O endereço de e-mail fornecido já está cadastrado.");
      } else if (error.code === "auth/invalid-email") {
        throw new Error("E-mail inválido: O endereço de e-mail fornecido é inválido.");
      } else {
        console.error("Erro durante o registro:", error);
        throw new Error("Erro desconhecido durante o registro.");
      }
    }
  };
  

  public sendPasswordReset = async (email: string) => {
    const response = await this.signInWithGoogleAuthUseCase.sendPasswordReset(email);
    return response;
  };

  public logout = async () => {
    await this.signInWithGoogleAuthUseCase.logout();
    
  };
}