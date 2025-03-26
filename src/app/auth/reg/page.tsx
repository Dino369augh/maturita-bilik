import RegisterForm from "./RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="p-6 bg-base-100 rounded-md shadow-md w-full max-w-xs">
        <h1 className="text-2xl font-bold text-center mb-4">Register</h1>
        
        {}
        <RegisterForm />

        {}
        <div className="mt-4 text-center">
          <p className="text-sm">
            MATE UZ UCET NA BANgER STARNKUA?A? ?XD?{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}