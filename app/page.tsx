
import ServiceCenter from '@/components/ServiceCenter'
import AsCenter from '@/components/AsCenter'
import ReviewTitle from '@/components/ReviewTitle'
import Reviews from '@/components/Reviews'
import ImagesSlider_ from '@/components/ui/hero_code'
import Bulk from '@/components/Bulk'

export default function Home() {
  return (
    <div>
      <ImagesSlider_ />
      <ServiceCenter />
      <AsCenter />
      <ReviewTitle />
      <Reviews />
      <Bulk />
    </div>
  )
}
