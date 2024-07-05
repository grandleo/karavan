import {Box, Image} from "@mantine/core";
import NextImage from "next/image";
import classes from "@/components/navBar/styles.module.css";
import {IconCloudDownload} from "@tabler/icons-react";
import {Controller, useForm} from "react-hook-form";
import {useEffect, useRef} from "react";
import {Dropzone, MIME_TYPES} from "@mantine/dropzone";
import {useUploadAvatarMutation} from "@/store/api/user.api";

const UserLogo = () => {
    const { handleSubmit, control, setValue, watch } = useForm();
    const avatar = watch('avatar');

    const [uploadAvatar] = useUploadAvatarMutation()

    useEffect(() => {
        if (avatar) {
            handleSubmit((data) => {
                const formData = new FormData();
                formData.append('avatar', data.avatar);

                console.log(formData)

                uploadAvatar(formData).unwrap()
                    .then((response) => {
                        console.log('Upload successful:', response);
                    })
                    .catch((error) => {
                        console.error('Upload failed:', error);
                    });
                // здесь вы можете обработать загруженные файлы
            })();
        }
    }, [avatar, handleSubmit]);

    return (
        <Box className={classes.userLogo}>
            <Image
                component={NextImage}
                src="/images/user-avatar.svg"
                fit="cover"
                width={80}
                height={80}
                alt=""
                className={classes.imagesShadow}
            />

            <form>
                <Controller
                    name="avatar"
                    control={control}
                    render={({field}) => (
                        <Dropzone
                            onDrop={(files) => field.onChange(files[0])}
                            onReject={(files) => console.log('rejected files', files)}
                            maxSize={3 * 1024 ** 2}
                            accept={[MIME_TYPES.png, MIME_TYPES.jpeg, MIME_TYPES.svg]}
                        >
                            <Box className={classes.uploadAvatar}>
                                <IconCloudDownload stroke={2} size={36} className={classes.uploadAvatarIcon}/>
                            </Box>
                        </Dropzone>
                    )}
                />
            </form>
        </Box>
    )
}

export default UserLogo;