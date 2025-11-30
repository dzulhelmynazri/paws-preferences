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
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AlertDialogInfo() {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					variant="secondary"
					size="lg"
					className="cursor-pointer rounded-full ring-2 ring-gray-200 ring-offset-2 ring-offset-background"
				>
					<Sparkles />
					Info
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Important Information</AlertDialogTitle>
					<AlertDialogDescription>
						Image may load slowly due to CATAAS API delays. So you may see brief
						interruptions.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogAction>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
