import MobileMenu from "@/components/MobileMenu";

export default function RootLayout({ children }) {
    return (
     <main>
      <MobileMenu/>
      {children}
     </main>
    )
  }
  