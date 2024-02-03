import Link from "next/link";
import {usePathname} from "next/navigation";
import "./NavigationBar.css"

export function NavigationBar() {
  const pathname = usePathname()
  return (
    <div className="fixed top-0 left-0 right-0 h-20 items-center flex text-l font-semibold navigationBar shadow-md z-10 justify-center">
      <Link href="/lethos/" className={`link hover:opacity-75 ${pathname === '/lethos' ? '' : 'opacity-50'}`}>Lethos</Link>
      <Link href="/crown/" className={`link hover:opacity-75 ${pathname === '/crown' ? '' : 'opacity-50'}`}>Crown</Link>
      <Link href="/mask/" className={`link hover:opacity-75 ${pathname === '/mask' ? '' : 'opacity-50'}`}>Mask</Link>
      <Link href="/m3/" className={`link hover:opacity-75 ${pathname === '/m3' ? '' : 'opacity-50'}`}>M3</Link>
      <Link href="/maze/" className={`link hover:opacity-75 ${pathname === '/maze' ? '' : 'opacity-50'}`}>Maze</Link>
      <Link href="/rainbow/" className={`link hover:opacity-75 ${pathname === '/rainbow' ? '' : 'opacity-50'}`}>Rainbow</Link>
      <Link href="/spider/" className={`link hover:opacity-75 ${pathname === '/spider' ? '' : 'opacity-50'}`}>Spider</Link>
    </div>
  )
}
