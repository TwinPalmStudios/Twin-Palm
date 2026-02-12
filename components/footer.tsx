import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col gap-8 py-8 md:flex-row md:py-12">
        <div className="flex-1 space-y-4">
          <h2 className="font-bold">Twin Palm</h2>
          <p className="text-sm text-muted-foreground">A new era of cinema.</p>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-12 sm:grid-cols-3">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Placeholder Text</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground transition-colors hover:text-primary hover:scale-105 transform duration-200 inline-block"
                >
                  Placeholder Text
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground transition-colors hover:text-primary hover:scale-105 transform duration-200 inline-block"
                >
                  Placeholder Text
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Placeholder Text</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground transition-colors hover:text-primary hover:scale-105 transform duration-200 inline-block"
                >
                  Placeholder Text
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground transition-colors hover:text-primary hover:scale-105 transform duration-200 inline-block"
                >
                  Placeholder Text
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Placeholder Text</h3>
            <div className="flex space-x-4">
              <span className="text-muted-foreground text-sm">Placeholder Text</span>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-blur-full border-t py-6">
        <div className="container">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Twin Palm Studios. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
