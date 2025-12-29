import { HomePage } from '@/features/home/home'
import { rubikBeastlyFont } from '../src/theme/fonts'

export default function Home() {
  return (
    <div className={rubikBeastlyFont.className}>
      <HomePage />
    </div>
  )
}
