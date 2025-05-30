import { Tooltip, tooltipClasses } from "@mui/material"
import { styled } from "@mui/material/styles"

export const ToolTip = styled(
    ({ className, ...props }: React.ComponentProps<typeof Tooltip> & { className?: string }) => (
        <Tooltip {...props} arrow classes={{ popper: className }} />
    )
)(({ }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "#1f2937", 
        color: "#ffffff",
        fontSize: "0.75rem", 
        borderRadius: "0.375rem", 
        padding: "0.5rem 0.75rem", 
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        textAlign: "center",
    },
    [`& .${tooltipClasses.arrow}`]: {
        color: "#1f2937"
    },
}))