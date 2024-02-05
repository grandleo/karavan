import {Button, Modal, SegmentedControl, TextInput} from "@mantine/core";
import {modals} from "@mantine/modals";
import {useState} from "react";
import {useDisclosure} from "@mantine/hooks";
import Login from "@/components/ui/auth/Login";
import Register from "@/components/ui/auth/Register";

const Auth = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const [authType, setAuthType] = useState('login');

    return (
        <>

            <Button variant="outline" onClick={open}>Войти</Button>
            <Modal
                opened={opened}
                onClose={close}
                title="С возвращением!"
                size="md"
            >
                <SegmentedControl
                    value={authType}
                    onChange={setAuthType}
                    data={[
                        { label: 'Войти', value: 'login' },
                        { label: 'Зарегистрироваться', value: 'register' }
                    ]}
                    fullWidth
                    mb={10}
                />

                {authType === 'login' ? <Login/> : <Register/>}
            </Modal>

        </>


    )
}

export default Auth