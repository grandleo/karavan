import {IconSettings, IconBuildingWarehouse, IconUsers, IconUsersGroup, IconTruckLoading, IconFileDollar} from '@tabler/icons-react';

interface IconProps {
    iconName: string
}

const Icons = ({ iconName }: IconProps) => {

    const iconsMapping: { [key: string]: React.ElementType } = {
        settings: IconSettings,
        warehouse: IconBuildingWarehouse,
        clients: IconUsers,
        suppliers: IconUsersGroup,
        logistics: IconTruckLoading,
        invoice: IconFileDollar
    };

    const SelectedIcon = iconsMapping[iconName];

    return (
        <>
            {SelectedIcon && <SelectedIcon />}
        </>
    )
}

export default Icons;