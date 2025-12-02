import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export function AlertDialogInfo() {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					variant="secondary"
					size="lg"
					className="cursor-pointer rounded-full bg-transparent ring-2 ring-gray-200 ring-offset-2 ring-offset-background"
				>
					<DotLottieReact
						src="https://lottie.host/8d913346-0a52-4627-a4f8-a6a6fcf22de2/oAkBkneyWm.lottie"
						loop
						autoplay
						className="w-24 -ml-10 -mr-8 -z-10 mb-8"
					/>
					Info
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="rounded-2xl">
				<AlertDialogHeader>
					<AlertDialogTitle>Important Information</AlertDialogTitle>
					<AlertDialogDescription>
						Image may load slowly due to CATAAS API delays. So you may see brief
						interruptions.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogAction className="rounded-full ring-1 ring-gray-200 ring-offset-2 ring-offset-background">
						Continue
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
