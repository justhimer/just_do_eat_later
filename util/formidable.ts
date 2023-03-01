import formidable, { Fields, Files } from "formidable";
import express from "express"
import {format} from "fecha"

export function formidableUserDetails(req: express.Request){
    const form = formidable({
        uploadDir : "uploads/user_upload",
        keepExtensions: true,
        maxFiles: 1,
        maxFileSize: 200*1024**2,
        filter:(part)=> part.mimetype?.startsWith("image/") || false,
        filename: (orgName,orgExt,part,form)=>{
            let timestamp = format(new Date(), "YYYYMMDDHHmmss")
            let ext = part.mimetype?.split('/').pop()
            return `new-user-${timestamp}.${ext}`
        }
    
    })
    return new Promise<{fields:Fields; icon:string}>((resolve,reject)=>{
        form.parse(req, (err,fields,files)=>{
            if (err) {
                reject (err)
                return
            }
            const file = Array.isArray(files) && files.length > 0? files[0] : files
            let icons = file.icon? file.icon.newFilename : 'default_user_icon.png'
            resolve({
                fields,
                icon: icons
            })
        })
    })
}

export function formidableIconUpdate(req: express.Request){
    const form = formidable({
        uploadDir : "uploads/user_upload",
        keepExtensions: true,
        maxFiles: 1,
        maxFileSize: 200*1024**2,
        filter:(part)=> part.mimetype?.startsWith("image/") || false,
        filename: (orgName,orgExt,part,form)=>{
            let timestamp = format(new Date(), "YYYYMMDDHHmmss")
            let ext = part.mimetype?.split('/').pop()
            return `user-${req.session.user!.id}-${timestamp}.${ext}`
        }
    
    })
    return new Promise<{icon:string}>((resolve,reject)=>{
        form.parse(req, (err,fields,files)=>{
            if (err) {
                reject (err)
                return
            }
            const file = Array.isArray(files) && files.length > 0? files[0] : files
            let icons = file.icon? file.icon.newFilename : 'default_user_icon.png'
            resolve({
                icon: icons
            })
        })
    })
}