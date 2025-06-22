const Footer = () => (
  <footer className="w-full py-4 px-10 md:px-28 lg:px-40 xl:px-56 bg-muted text-muted-foreground border-t flex items-center justify-between text-sm">
    <div>
      Need help? Visit our{" "}
      <a href="/help" className="underline hover:text-primary">
        Help Center
      </a>{" "}
      or contact support.
    </div>
    <div>&copy; {new Date().getFullYear()} Spout Dashboard</div>
  </footer>
)

export default Footer
