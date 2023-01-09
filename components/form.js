import {
	Box,
	Flex,
	Stack,
	Heading,
	Text,
	Container,
	Input,
	Button,
	SimpleGrid,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";

const avatars = [
	{
		name: "Ryan Florence",
		url: "https://bit.ly/ryan-florence",
	},
	{
		name: "Segun Adebayo",
		url: "https://bit.ly/sage-adebayo",
	},
	{
		name: "Kent Dodds",
		url: "https://bit.ly/kent-c-dodds",
	},
	{
		name: "Prosper Otemuyiwa",
		url: "https://bit.ly/prosper-baba",
	},
	{
		name: "Christian Nwamba",
		url: "https://bit.ly/code-beast",
	},
];

export default function Form({
	setStep,
	firstname,
	setFirstname,
	lastname,
	setLastname,
	email,
	setEmail,
	phone,
	setPhone,
}) {
	const [firstnameError, setFirstnameError] = useState("");
	const [lastnameError, setLastnameError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [phoneError, setPhoneError] = useState("");
	const handleSubmit = () => {
		setFirstnameError("");
		setLastnameError("");
		setEmailError("");
		setPhoneError("");
		let isErrors = false;
		//validate first and last name
		if (firstname.trim() === "") {
			setFirstnameError("First name is required");
			isErrors = true;
		}
		if (lastname.trim() === "") {
			setLastnameError("Last name is required");
			isErrors = true;
		}
		if (email.trim() === "") {
			setEmailError("Email is required");
			isErrors = true;
		} else {
			const re =
				/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
			if (!re.test(email)) {
				setEmailError("Email is not valid");
				isErrors = true;
			}
		}
		if (phone.trim() === "") {
			setPhoneError("Phone is required");
			isErrors = true;
		} else {
			const re = /^[0-9\b]+$/;
			if (!re.test(phone)) {
				setPhoneError("Phone is not valid");
				isErrors = true;
			}
		}
		if (!isErrors) {
			setStep(1);
		}
	};
	return (
		<Box
			as={motion.div}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
			position={"relative"}
		>
			<Container
				// as={SimpleGrid}
				maxW={"7xl"}
				columns={{ base: 1, md: 2 }}
				spacing={{ base: 10, lg: 32 }}
				py={{ base: 10, sm: 20, lg: 32 }}
			>
				<Stack
					bg={"gray.50"}
					rounded={"xl"}
					p={{ base: 4, sm: 6, md: 8 }}
					spacing={{ base: 8 }}
					maxW={{ lg: "lg" }}
				>
					<Stack spacing={4}>
						<Heading
							color={"gray.800"}
							lineHeight={1.1}
							fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
						>
							Hello there{" "}
							<Text
								as={"span"}
								bgGradient='linear(to-r, red.400,pink.400)'
								bgClip='text'
							>
								!
							</Text>
						</Heading>
						<Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
							to play our game an win the prize we need to know you better
						</Text>
					</Stack>
					<Box as={"form"} mt={10}>
						<Stack spacing={4}>
							<Input
								placeholder='Firstname'
								bg={"gray.100"}
								border={0}
								color={"gray.500"}
								_placeholder={{
									color: "gray.500",
								}}
								value={firstname}
								onChange={(e) => setFirstname(e.target.value)}
							/>
							{firstnameError && (
								<Text
									color={"red.500"}
									px={3}
									fontSize={{ base: "sm", sm: "md" }}
								>
									{firstnameError}
								</Text>
							)}
							<Input
								placeholder='Lastname'
								bg={"gray.100"}
								border={0}
								color={"gray.500"}
								_placeholder={{
									color: "gray.500",
								}}
								value={lastname}
								onChange={(e) => setLastname(e.target.value)}
							/>
							{lastnameError && (
								<Text
									color={"red.500"}
									px={3}
									fontSize={{ base: "sm", sm: "md" }}
								>
									{lastnameError}
								</Text>
							)}
							<Input
								placeholder='firstname@lastname.io'
								bg={"gray.100"}
								border={0}
								color={"gray.500"}
								_placeholder={{
									color: "gray.500",
								}}
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							{emailError && (
								<Text
									color={"red.500"}
									px={3}
									fontSize={{ base: "sm", sm: "md" }}
								>
									{emailError}
								</Text>
							)}
							<Input
								placeholder='+1 (___) __-___-___'
								bg={"gray.100"}
								border={0}
								color={"gray.500"}
								_placeholder={{
									color: "gray.500",
								}}
								value={phone}
								// phone.length === 0
								// 		? ""
								// 		: "+1 (" +
								// 		  phone.slice(0, 3) +
								// 		  ") " +
								// 		  phone.slice(3, 6) +
								// 		  "-" +
								// 		  phone.slice(6, 9) +
								// 		  "-" +
								// 		  phone.slice(9, 12) +
								// 		  ""
								onChange={(e) => setPhone(e.target.value)}
							/>
							{phoneError && (
								<Text
									color={"red.500"}
									px={3}
									fontSize={{ base: "sm", sm: "md" }}
								>
									{phoneError}
								</Text>
							)}
						</Stack>
						<Button
							fontFamily={"heading"}
							mt={8}
							w={"full"}
							bgGradient='linear(to-r, red.400,pink.400)'
							color={"white"}
							_hover={{
								bgGradient: "linear(to-r, red.400,pink.400)",
								boxShadow: "xl",
							}}
							onClick={() => handleSubmit()}
						>
							Submit
						</Button>
					</Box>
					form
				</Stack>
			</Container>
		</Box>
	);
}
