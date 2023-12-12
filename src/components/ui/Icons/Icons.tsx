import {IconSettings, IconBuildingWarehouse} from '@tabler/icons-react';

interface IconProps {
    iconName: string
}

const Icons = ({ iconName }: IconProps) => {

    const iconsMapping: { [key: string]: React.ElementType } = {
        settings: IconSettings,
        warehouse: IconBuildingWarehouse,
    };

    const SelectedIcon = iconsMapping[iconName];

    return (
        <>
            {SelectedIcon && <SelectedIcon />}
        </>
    )
}

export default Icons;