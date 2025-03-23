import Link from "next/link";
import { Button } from "../ui/button";

type ButtonProps = {
  text: string;
  icon: any;
  onClick?: () => void;
};

export default function BigDashBtn({ text, icon, onClick }: ButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="flex text-black text-start flex-col gap-6 bg-white hover:bg-primary/20 align-start border px-6 py-8 rounded-lg"
    >
      {icon}
      <h3>{text}</h3>
    </Button>
  );
}
