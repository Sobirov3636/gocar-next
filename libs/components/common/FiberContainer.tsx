import React, { useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Suspense } from 'react';
import { Preload, Image as ImageImpl } from '@react-three/drei';
import { ScrollControls, Scroll } from './ScrollControls';
import * as THREE from 'three';

function Image(props: any) {
	const ref = useRef<THREE.Group>();
	const group = useRef<THREE.Group>();

	return (
		// @ts-ignore
		<group ref={group}>
			<ImageImpl ref={ref} {...props} />
		</group>
	);
}

function Page({ m = 0.4, urls, ...props }: any) {
	const { width } = useThree((state) => state.viewport);
	const w = width < 10 ? 1.5 / 3 : 1 / 3;

	return (
		<group {...props}>
			<Image position={[-width * w, 0, -1]} scale={[width * w - m * 2, 5, 1]} url={urls[0]} />
			<Image position={[0, 0, 0]} scale={[width * w - m * 2, 5, 1]} url={urls[1]} />
			<Image position={[width * w, 0, 1]} scale={[width * w - m * 2, 5, 1]} url={urls[2]} />
		</group>
	);
}

function Pages() {
	const { width } = useThree((state) => state.viewport);

	return (
		<>
			<Page
				position={[width * 0, 0, 0]}
				urls={['/img/fiber/img7.webp', '/img/fiber/img8.jpg', '/img/fiber/img1.jpg']}
			/>
			<Page
				position={[width * 1, 0, 0]}
				urls={['/img/fiber/img4.jpg', '/img/fiber/img5.jpg', '/img/fiber/img6.webp']}
			/>
			<Page
				position={[width * 2, 0, 0]}
				urls={['/img/fiber/img2.avif', '/img/fiber/img3.webp', '/img/fiber/img4.jpg']}
			/>
			<Page
				position={[width * 3, 0, 0]}
				urls={['/img/fiber/img7.webp', '/img/fiber/img8.jpg', '/img/fiber/img1.jpg']}
			/>
			<Page
				position={[width * 4, 0, 0]}
				urls={['/img/fiber/img4.jpg', '/img/fiber/img5.jpg', '/img/fiber/img6.webp']}
			/>
		</>
	);
}

export default function FiberContainer() {
	return (
		<div className="threeJSContainer" style={{ marginTop: '100px', width: '100%', height: '512px' }}>
			<Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
				<Suspense fallback={null}>
					<ScrollControls infinite horizontal damping={4} pages={4} distance={1}>
						<Scroll>
							<Pages />
						</Scroll>
					</ScrollControls>
					<Preload />
				</Suspense>
			</Canvas>
		</div>
	);
}

// import * as THREE from 'three';
// import { Suspense, useRef, useState } from 'react';
// import { Canvas, useFrame, useThree } from '@react-three/fiber';
// import { Preload, ScrollControls, Scroll, useScroll, Image as ImageImpl } from '@react-three/drei';

// function Image({ c = new THREE.Color(), ...props }) {
// 	const ref = useRef();
// 	const [hovered, hover] = useState(false);
// 	useFrame(() => {
// 		//@ts-ignore
// 		ref.current.material.color.lerp(c.set(hovered ? 'white' : '#ccc'), hovered ? 0.4 : 0.05);
// 	});
// 	//@ts-ignore
// 	return <ImageImpl ref={ref} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)} {...props} />;
// }

// function Images() {
// 	const { width, height } = useThree((state) => state.viewport);
// 	const data = useScroll();
// 	const group = useRef();
// 	useFrame(() => {
// 		//@ts-ignore

// 		group.current.children[0].material.zoom = 1 + data.range(0, 1 / 3) / 3;
// 		//@ts-ignore

// 		group.current.children[1].material.zoom = 1 + data.range(0, 1 / 3) / 3;
// 		//@ts-ignore

// 		group.current.children[2].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 3;
// 		//@ts-ignore

// 		group.current.children[3].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;
// 		//@ts-ignore

// 		group.current.children[4].material.zoom = 1 + data.range(1.25 / 3, 1 / 3) / 1;
// 		//@ts-ignore

// 		group.current.children[5].material.zoom = 1 + data.range(1.8 / 3, 1 / 3) / 3;
// 		//@ts-ignore

// 		group.current.children[5].material.grayscale = 1 - data.range(1.6 / 3, 1 / 3);
// 		//@ts-ignore

// 		group.current.children[6].material.zoom = 1 + (1 - data.range(2 / 3, 1 / 3)) / 3;
// 	});
// 	return (
// 		//@ts-ignore

// 		<group ref={group}>
// 			<Image position={[-2, 0, 0]} scale={[4, height, 1]} url="/img/fiber/img1.jpg" />
// 			<Image position={[3, 0, 1]} scale={4} url="/img/fiber/img2.avif" />
// 			<Image position={[-2.3, -height, 2]} scale={[1, 3, 1]} url="/img/fiber/img3.webp" />
// 			<Image position={[-0.6, -height, 3]} scale={[1, 2, 1]} url="/img/fiber/img4.jpg" />
// 			<Image position={[0.75, -height, 3.5]} scale={1.5} url="/img/fiber/img5.jpg" />
// 			<Image position={[0, -height * 1.5, 2.5]} scale={[1.5, 3, 1]} url="/img/fiber/img6.webp" />
// 			<Image position={[0, -height * 2 - height / 4, 0]} scale={[width, height / 2, 1]} url="/img/fiber/img7.webp" />
// 		</group>
// 	);
// }

// export default function FiberContainer() {
// 	return (
// 		<Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
// 			<Suspense fallback={null}>
// 				<ScrollControls damping={4} pages={3}>
// 					<Scroll>
// 						<Images />
// 					</Scroll>
// 					<Scroll html>
// 						<h1 style={{ position: 'absolute', top: '60vh', left: '0.5em' }}>to</h1>
// 						<h1 style={{ position: 'absolute', top: '120vh', left: '60vw' }}>be</h1>
// 						<h1 style={{ position: 'absolute', top: '198.5vh', left: '0.5vw', fontSize: '40vw' }}>home</h1>
// 					</Scroll>
// 				</ScrollControls>
// 				<Preload />
// 			</Suspense>
// 		</Canvas>
// 	);
// }
