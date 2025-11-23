import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import type { ReactNode } from "react"

interface AuthWrapperProps {
    title: string
    description: string
    children: ReactNode
    footerText: string
    footerLinkText: string
    footerLinkHref: string
}

export function AuthWrapper({
    title,
    description,
    children,
    footerText,
    footerLinkText,
    footerLinkHref,
}: AuthWrapperProps) {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-slate-50 px-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">{title}</CardTitle>
                    <CardDescription className="text-center">
                        {description}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {children}
                </CardContent>
                <CardFooter className="justify-center">
                    <p className="text-sm text-muted-foreground">
                        {footerText} <a href={footerLinkHref} className="text-primary hover:underline">{footerLinkText}</a>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}
