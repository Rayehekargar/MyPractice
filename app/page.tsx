import Image from "next/image";
import LoanForm from "./ui/loans/loanForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <LoanForm/>
    
    </main>
  );
}
