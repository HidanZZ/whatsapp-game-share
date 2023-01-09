import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, transform, useAnimation } from "framer-motion";
import Confetti from "react-confetti";
import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { IoMdArrowForward } from "react-icons/io";
const containerSize = 390;
const rows = [0, 1, 2];
const columns = rows;
const boxSize = containerSize / rows.length;
const transition = { duration: 3, loop: Infinity, ease: "easeOut" };

export function Matrix({ setStep }) {
	const x = useMotionValue(-boxSize);
	const y = useMotionValue(-boxSize);
	const containerRef = useRef(null);
	const animation = useAnimation();
	const [clicks, setClicks] = useState(0);
	const loopAnimation = () =>
		animation.start({
			x: [-boxSize, containerSize, containerSize, -boxSize, -boxSize],
			y: [-boxSize, -boxSize, containerSize, containerSize, -boxSize],
			rotate: [0, 0, 90, 90, 180, 180, 270, 270, 360],
			transition,
		});

	const stopAnimation = () => animation.stop();

	const handleMouseMove = (event) => {
		if (clicks > 1) return;
		x.set(
			event.pageX - containerRef.current.getBoundingClientRect().x - boxSize / 2
		);
		y.set(
			event.pageY - containerRef.current.getBoundingClientRect().y - boxSize / 2
		);
	};

	useEffect(() => {
		//loopAnimation();
		return () => stopAnimation();
	}, [loopAnimation, stopAnimation]);

	return (
		<Box
			p={4}
			as={motion.div}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
			style={styles.page}
			onMouseEnter={stopAnimation}
			// onMouseLeave={restartAnimation}
			onMouseMove={handleMouseMove}
		>
			{clicks > 1 ? (
				<>
					<Confetti></Confetti>
					<Text
						as={motion.div}
						animate={{
							scale: [1, 1.5, 1],
						}}
						transition={{
							duration: 1,
							loop: Infinity,
							ease: "easeOut",
						}}
						fontSize='5xl'
						style={{
							//bold
							fontWeight: 700,
						}}
					>
						You win!
					</Text>
				</>
			) : (
				<VStack spacing={2} textAlign='center'>
					<Text fontSize='2xl' color={"gray.500"}>
						Click on the boxes to win! {3 - clicks} chances left!
					</Text>
				</VStack>
			)}
			<div style={styles.container} ref={containerRef}>
				{rows.map((row, rowIndex) =>
					columns.map((column, columnIndex) => (
						<Tile
							x={x}
							y={y}
							row={rowIndex}
							column={columnIndex}
							key={`${row}${column}`}
							setClicks={setClicks}
							clicks={clicks}
						/>
					))
				)}
			</div>
			{clicks > 1 && (
				<Button
					rightIcon={<IoMdArrowForward />}
					colorScheme='green'
					variant='solid'
					marginTop={"1rem"}
					fontSize={"2xl"}
					padding={"1.8rem"}
					borderRadius={"1rem"}
					onClick={() => setStep((prev) => prev + 1)}
				>
					Get your prize
				</Button>
			)}
		</Box>
	);
}

const Tile = ({ x, y, row, column, setClicks, clicks }) => {
	const top = column * boxSize;
	const left = row * boxSize;

	const angle = useMotionValue(0);
	const scale = useMotionValue(0.7);
	const borderRadius = useMotionValue(boxSize * 0.33);
	const background = useMotionValue("#60F");
	const display = useMotionValue("block");
	const [flip, setFlip] = useState(true);
	const revealed = useMotionValue(false);
	const [backContent, setBackContent] = useState("");

	useEffect(() => {
		function updateProps() {
			const updatedAngle = calcAngle(top, left, x.get(), y.get());
			angle.set(updatedAngle);

			const proximity = Math.max(
				Math.abs(left - x.get()),
				Math.abs(top - y.get())
			);
			const newColor = transform(
				proximity,
				[0, containerSize - boxSize],
				["#60F", "#60F"]
			);
			const newScale = transform(
				proximity,
				[0, containerSize - boxSize],
				[1, 0.7]
			);
			const newBorderRadius = transform(
				proximity,
				[0, containerSize - boxSize],
				[boxSize * 0.11, boxSize * 0.33]
			);
			if (!revealed) background.set(newColor);
			scale.set(newScale);
			borderRadius.set(newBorderRadius);
		}

		const unsubscribeX = x.onChange(updateProps);
		const unsubscribeY = y.onChange(updateProps);

		return () => {
			unsubscribeX();
			unsubscribeY();
		};
	}, []);
	useEffect(() => {
		if (clicks > 1) {
			scale.set(0.7);
			borderRadius.set(boxSize * 0.33);
		}
	}, [clicks]);
	return (
		<motion.div
			onClick={() => {
				// display.set("none");
				if (clicks < 2) {
					setFlip((prevState) => !prevState);
					setClicks((prev) => {
						const newClicks = prev + 1;
						if (newClicks > 1) {
							background.set("#59e717");
						} else {
							background.set("#f70000");
						}
						return newClicks;
					});
					revealed.set(true);
				}
			}}
			style={{
				...styles.Box,
				position: "absolute",
				top,
				left,
				background,
				scale,
				borderRadius,
				display,
			}}
			rotate={angle}
			animate={{ rotateY: flip ? 0 : 180 }}
		>
			{" "}
		</motion.div>
	);
};

function calcAngle(top, left, cursorTop, cursorLeft) {
	let angle = Math.atan2(cursorTop - left, cursorLeft - top) * (180 / Math.PI);
	return angle < 0 ? -(angle + 540) : -(angle + 180);
}

const styles = {
	page: {
		width: "100vw",
		height: "100vh",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		flexDirection: "column",
		top: 0,
		left: 0,
	},
	container: {
		position: "relative",
		width: containerSize,
		height: containerSize,
	},
	Box: {
		height: boxSize,
		width: boxSize,
	},
	magnet: {
		height: boxSize,
		width: boxSize,
		borderRadius: boxSize * 0.33,
	},
};
