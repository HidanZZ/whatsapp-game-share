import {
	Box,
	Stack,
	HStack,
	Heading,
	Text,
	VStack,
	useColorModeValue,
	List,
	ListItem,
	ListIcon,
	Button,
} from "@chakra-ui/react";
import { ImWhatsapp } from "react-icons/im";
import { Progress } from "@chakra-ui/react";
import { useState } from "react";
import { motion, useMotionValue } from "framer-motion";

function Wrapper({ children }) {
	return (
		<Box
			mb={4}
			shadow='base'
			borderWidth='1px'
			w={"100%"}
			alignSelf={{ base: "center", lg: "flex-start" }}
			borderColor={useColorModeValue("gray.200", "gray.500")}
			borderRadius={"xl"}
		>
			{children}
		</Box>
	);
}

export default function Share({ setStep }) {
	const [clicks, setClicks] = useState(0);
	const valueVariant = {
		0: { width: 0 },
		1: { width: "20%" },
		2: { width: "40%" },
		3: { width: "60%" },
		4: { width: "80%" },
		5: { width: "100%" },
	};
	return (
		<Box
			as={motion.div}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
			py={12}
		>
			<VStack spacing={2} textAlign='center'>
				<Heading as='h1' color={"green"} fontSize='4xl'>
					Congratulations!
				</Heading>
				<Text fontSize='lg' color={"gray.500"}>
					share with 5 people via whatsapp to unlock the discount
				</Text>
			</VStack>
			<Stack
				direction={{ base: "column", md: "row" }}
				textAlign='center'
				justify='center'
				spacing={{ base: 4, lg: 10 }}
				py={10}
			>
				<Wrapper>
					<Box position='relative'>
						<Box py={4} px={8}>
							<Progress
								as={motion.div}
								borderRadius={"xl"}
								hasStripe
								value={100}
								initial={0}
								variants={valueVariant}
								animate={valueVariant[clicks]}
							></Progress>
						</Box>
						<Box>
							{/* show progress*/}
							<Box fontSize='2xl' fontWeight='bold' color='green.500'>
								{clicks}/5
							</Box>
						</Box>
						<VStack
							bg={useColorModeValue("gray.50", "gray.700")}
							py={4}
							borderBottomRadius={"xl"}
						>
							<Box w='80%' pt={5}>
								<Button
									w='full'
									leftIcon={<ImWhatsapp></ImWhatsapp>}
									colorScheme='green'
									onClick={() => {
										//share to whatsapp
										window.open("https://wa.me/?text=Hello%20World");
										setClicks((prev) => {
											if (prev < 5) {
												return prev + 1;
											} else {
												return prev;
											}
										});
									}}
								>
									Share
								</Button>
							</Box>
						</VStack>
					</Box>
				</Wrapper>
			</Stack>
		</Box>
	);
}
