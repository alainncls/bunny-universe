import { WalletButton } from "@/components/WalletButton";

export default function Header() {
  return (
    <header className="w-full flex justify-between p-4">
      <div className="flex items-center gap-4">
        <span>🥕 Bunny Universe</span>
      </div>
      <WalletButton />
    </header>
  );
}
