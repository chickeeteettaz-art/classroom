import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "@/constants";
import React, {useEffect, useRef, useState} from 'react'
import {UploadWidgetValue} from "@/types";
import {UploadCloud, UploadIcon} from "lucide-react";

// @ts-ignore
const UploadWidget = ({value=null,onChange,disabled=false}) => {

    const widgetRef = useRef<CloudinaryWidget | null>(null)
    const onChangeRef = useRef(onChange)
    const [preview,setPreview] = useState<UploadWidgetValue | null>(value)

    const [deleteToken,setDeleteToken] = useState<string | null>(null)
    const [isRemoving,setIsRemoving] = useState<boolean>(false)

    const openWidget = () => {
        if(!disabled){
            widgetRef.current?.open()
        }
    }

    useEffect(() => {
        setPreview(value)
        if(!value) setDeleteToken(null)
    },[value])

    useEffect(() => {
        onChangeRef.current = onChange
    }, [onChange]);

    useEffect(() => {
        if(typeof window ==='undefined') return;

        const initialiseWidget = () => {
            if(!window.cloudinary || widgetRef.current) return false;

            widgetRef.current = window.cloudinary.createUploadWidget({
                cloudName: CLOUDINARY_CLOUD_NAME,
                uploadPreset: CLOUDINARY_UPLOAD_PRESET,
                sources: ['local', 'url'],
                showAdvancedOptions: false,
                cropping: false,
                multiple: false,
                maxFiles: 1,
                defaultSource: 'local',
                maxFileSize: 5000000,
                folder: 'uploads',
                clientAllowedFormats: ['png', 'jpg', 'jpeg'],
            }, (error, result) => {
                if(!error && result.event === "success") {
                    const payload: UploadWidgetValue = {
                        url:result.info.secure_url,
                        publicId:result.info.public_id,
                    }
                    setPreview(payload)
                    setDeleteToken(result.info.delete_token ?? null);
                    onChangeRef.current?.(payload)
                }

            })
            return true;
        }

        if(initialiseWidget()) return;

        const intervalId = window.setInterval(() =>{
            if(initialiseWidget()){
                window.clearInterval(intervalId)
            }
        }, 500)

        return () => window.clearInterval(intervalId)
    }, []);
    const removeFromCloudinary = async () => {

    }
    return (
        <div className={'space-y-2'}>
            {preview ? (
                    <div className={'upload-preview'}>
                        <img src={preview.url} alt={'Preview'}/>
                    </div>
                ):
                <div className={'upload-dropzone'}  role={'button'}
                     tabIndex={0}
                     onClick={openWidget}
                     onKeyDown={(event) => {
                         if(event.key === 'Enter'){
                             event.preventDefault()
                             openWidget()
                         }
                     }}>
                    <div className={'upload-prompt'}>
                        <UploadCloud className={'icon'}/>
                        <div>
                            <p>Click to upload photo</p>
                            <p>PNG, JPG up to 5MB</p>
                        </div>
                    </div>
                </div>

            }
        </div>
    )
}
export default UploadWidget
