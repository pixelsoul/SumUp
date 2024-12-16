import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type AlertDialogProps = {
    trigger: React.ReactNode
    title?: string
    content?: React.ReactNode
    action?: () => void
}

export default function CustomAlertDialog(
    { trigger, title, content, action }: AlertDialogProps = {
        trigger: "Show Dialog",
        title: "Are you absolutely sure?",
        content: "This action cannot be undone.",
    }
) {
    return (
        <AlertDialog>
            <AlertDialogTrigger>{trigger}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{content}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => {
                            if (action) {
                                action()
                            }
                        }}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
