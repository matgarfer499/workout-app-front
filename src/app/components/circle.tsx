import Link from "next/link";

interface CircleProps {
    backgroundColor: string;
    href: string;
}

export default function Circle({ backgroundColor, href }: CircleProps) {
    return (
        <Link href={href} className={`w-2 h-2 rounded-full ${backgroundColor} cursor-pointer hover:bg-orange-200`} />
    )
}
