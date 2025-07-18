package com.spring.foodorder.Services;

import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

@Service
public class CloudinaryService {
    @Autowired
    private Cloudinary cloudinary;

    public String uploadImage(MultipartFile image, String imageId) {
        try (InputStream is = image.getInputStream();
             ByteArrayOutputStream buffer = new ByteArrayOutputStream()) {

            byte[] tmp = new byte[1024];
            int bytesRead;
            while ((bytesRead = is.read(tmp)) != -1) {
                buffer.write(tmp, 0, bytesRead);
            }

            cloudinary.uploader().upload(buffer.toByteArray(), ObjectUtils.asMap(
                    "public_id", imageId));

            return getUrlFromPublicId(imageId);
        }
        catch (IOException e) {
            e.printStackTrace();
            return "Error uploading image";
        }
    }

    public String getUrlFromPublicId(String publicId) {
        return cloudinary
                .url()
                .transformation(
                        new Transformation<>()
                                .width(500)
                                .height(500)
                                .crop("fill"))
                .generate(publicId);
    }
}
