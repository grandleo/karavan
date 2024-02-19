import {Dropzone, FileWithPath, MIME_TYPES} from "@mantine/dropzone";
import {Box, Image, SimpleGrid, Text} from "@mantine/core";
import {useState} from "react";
import {IconPhoto, IconUpload, IconX} from "@tabler/icons-react";

const DropzoneImages = ({uploaderFiles, setValue, error, image} : DropzoneImageTypes) => {
    const [files, setFiles] = useState<FileWithPath[]>([]);

    const previews = files.map((file, index) => {
        const imageUrl = URL.createObjectURL(file);
        return <Image key={index} src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />;
    });

    return (
        <Box ta="center">
            <Dropzone
                accept={[
                    MIME_TYPES.svg
                ]}
                onDrop={
                    (files) => {
                        setFiles(files)
                        setValue('image', files)
                    }
                }>

                <Dropzone.Accept>
                    <IconUpload
                        stroke={1.5}
                    />
                </Dropzone.Accept>

                <Dropzone.Reject>
                    <IconX
                        stroke={1.5}
                    />
                </Dropzone.Reject>

                <Dropzone.Idle>
                    <IconPhoto
                        stroke={1.5}
                    />
                </Dropzone.Idle>
                <Box>
                    <Text size="xl" inline>
                        Перетащите файлы сюда или нажмите, чтобы загрузить
                    </Text>
                    <Text size="sm" c="dimmed" inline mt={7}>
                        Максимальный размер файла 5мб. Загрузить можно только файлы формата SVG
                    </Text>

                    <Text c="red">{error}</Text>
                </Box>
            </Dropzone>

            <SimpleGrid cols={{base: 1, sm: 4}} mt={previews.length > 0 ? 'xl' : 0}>
                {previews.length > 0 ? previews : (image ? <Image src={image} width={90} height={90} alt="" /> : null)}
            </SimpleGrid>
        </Box>
    )
}

export default DropzoneImages;