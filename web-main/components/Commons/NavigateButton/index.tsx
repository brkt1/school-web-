import BackButton from "./BackButton";
import RefreshButton, { RefreshButtonProps } from "./RefreshButton";

interface NavigateButtonProps extends RefreshButtonProps {
    
}

const NavigateButton = ({search}: NavigateButtonProps) => {
    return <div className="flex gap-2">
        <BackButton />
        <RefreshButton search={search} />
    </div>
}

export default NavigateButton