
import ServiceCenter from '@/components/ServiceCenter'
import AsIntro from '@/components/AsIntro'
import AsTitle from '@/components/AsTitle'
import ReviewTitle from '@/components/ReviewTitle'
import Reviews from '@/components/Reviews'
import ImagesSlider_ from '@/components/ui/hero_code'

export default function Home() {
  return (
    <div>
      <ImagesSlider_ />
      <ServiceCenter />
      <AsTitle />
      <AsIntro />
      <ReviewTitle />
      <Reviews />
    </div>
  )
}
