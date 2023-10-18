import e from "express";
import { AuthValue } from "../../domain/auth-value";
import { AuthEntity } from "../../domain/authentication";
import { AuthRepository } from "../repository/auth-repository";

export class SignInWithGoogleAuthUseCase {
  constructor(private authRepository: AuthRepository) {}

  public signInWithGoogle = async () => {
    const response = await this.authRepository.signInWithGoogle();
    return response;
  };

  public logInWithEmailAndPassword = async(email: string, password: string) => {
    const response = await this.authRepository.logInWithEmailAndPassword({email, password});
    return response;
  };

  public registerWithEmailAndPassword = async (
    email: string,
    password: string,
  ) => {
    const authValue = new AuthValue({ email, password });
    const response=  await this.authRepository.registerWithEmailAndPassword(
      authValue
    );
  return response
  };

  public sendPasswordReset = async (email: string) => {
    const response = await this.authRepository.sendPasswordReset(email);
    return response;
  };

  public logout = async () => {
    const response = await this.authRepository.logout();
    return response;
  };
}
