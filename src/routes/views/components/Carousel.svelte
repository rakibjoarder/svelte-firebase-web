<script>
	import { Swiper, SwiperSlide } from 'swiper/svelte';
	import banner1 from '../../../assets/images/banner1.jpeg';
	import banner2 from '../../../assets/images/banner2.jpeg';

	// Import Swiper styles
	import 'swiper/css';

	import 'swiper/css/pagination';
	import 'swiper/css/navigation';

	// import Swiper core and required modules
	import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper';

	// install Swiper modules
	SwiperCore.use([Autoplay, Pagination, Navigation]);
</script>

<Swiper
	spaceBetween={30}
	centeredSlides={true}
	autoplay={{
		delay: 2500,
		disableOnInteraction: false
	}}
	pagination={{
		clickable: true
	}}
	navigation={true}
	class="mySwiper rounded-lg shadow-sm m-8  md:h-auto"
>
	<SwiperSlide><img src={banner1} alt="" class="image-full" /></SwiperSlide><SwiperSlide
		><img src={banner2} alt="" /></SwiperSlide
	>
</Swiper>
