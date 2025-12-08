import { PutObjectCommand, DeleteObjectCommand, S3Client, HeadObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { S3ConfigService } from "@infra/config/s3.config";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import "multer";

export interface FileType {
    buffer: Buffer;
    filename: string;
    mimetype: string;
    originalname: string
}

@Injectable()
export class S3UploadService {
    private readonly s3Client: S3Client;
    private readonly bucketName: string;
    private readonly region: string;

    constructor(private readonly s3Config: S3ConfigService) {
        const { accessKeyId, secretAccessKey, region, bucketName } =
            this.s3Config.getS3Config();

        if (!bucketName || !region) {
            throw new Error(
                'S3 configuration is missing required bucketName or region.',
            );
        }
        if (!accessKeyId || !secretAccessKey) {
            throw new Error(
                'S3 configuration is missing required accessKeyId or secretAccessKey.',
            );
        }
        this.bucketName = bucketName;
        this.region = region;
        this.s3Client = new S3Client({
            region,
            credentials: {
                accessKeyId,
                secretAccessKey,
            },
        });
    }

    async uploadImageWithFolder(file: FileType, folder: string, slug: string, sizeTag?: string): Promise<{ url: string }> {
        const fileExtension = file.originalname.split('.').pop();
        const tag = sizeTag ? `_${sizeTag}` : ""; // "_small", "_medium", "_full"

        const uniqueFileName = `${slug}${tag}-${randomUUID()}-${Date.now()}.${fileExtension}`;

        const params = {
            Bucket: this.bucketName,
            Key: `${folder}/${slug}/${uniqueFileName}`,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        try {
            const command = new PutObjectCommand(params);
            await this.s3Client.send(command);

            return {
                url: `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${folder}/${slug}/${uniqueFileName}`,
            };
        } catch (error) {
            console.error('S3 Upload Error:', error);
            throw new InternalServerErrorException('Error uploading file to S3');
        }
    }

    async uploadFile(file: FileType, slug: string, sizeTag?: string): Promise<{ url: string }> {
        const fileExtension = file.originalname.split('.').pop();
        const tag = sizeTag ? `_${sizeTag}` : ""; // "_small", "_medium", "_full"

        const uniqueFileName = `${slug}${tag}-${randomUUID()}-${Date.now()}.${fileExtension}`;

        const params = {
            Bucket: this.bucketName,
            Key: `${slug}/${uniqueFileName}`,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        try {
            const command = new PutObjectCommand(params);
            await this.s3Client.send(command);

            return {
                url: `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${slug}/${uniqueFileName}`,
            };
        } catch (error) {
            console.error('S3 Upload Error:', error);
            throw new InternalServerErrorException('Error uploading file to S3');
        }
    }



    async uploadFileWithFolder(file: FileType, folderPath: string, alias: string, sizeTag?: string): Promise<{ url: string } | null> {
        const fileExtension = file.originalname.split('.').pop();
        const tag = sizeTag ? `${sizeTag}` : ""; // "_small", "_medium", "_full"

        const uniqueFileName = `${alias}-${tag}-${randomUUID()}-${Date.now()}.${fileExtension}`;

        console.log(uniqueFileName)

        const cleanFolderPath = folderPath.startsWith('/') ? folderPath.substring(1) : folderPath;

        console.log(cleanFolderPath)

        const params = {
            Bucket: this.bucketName,
            Key: `${cleanFolderPath}/${alias}/${uniqueFileName}`,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        console.log(params)

        // return null

        try {
            const command = new PutObjectCommand(params);
            await this.s3Client.send(command);

            return {
                url: `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${cleanFolderPath}/${alias}/${uniqueFileName}`,
            };
        } catch (error) {
            console.error('S3 Upload Error:', error);
            throw new InternalServerErrorException('Error uploading file to S3');
        }
    }

    async deleteFile(fileKey: string): Promise<boolean> {
        // Extract key if full URL is provided
        const bucketUrl = `https://${this.bucketName}.s3.${this.region}.amazonaws.com/`;
        if (fileKey.startsWith(bucketUrl)) {
            fileKey = fileKey.replace(bucketUrl, '');
        }

        const params = {
            Bucket: this.bucketName,
            Key: fileKey,
        };

        // First, check if file exists
        try {
            const headCommand = new HeadObjectCommand(params);
            await this.s3Client.send(headCommand);
        } catch (error) {
            // If error is NotFound (404), file doesn't exist
            if (error.name === 'NotFound' || error.$metadata?.httpStatusCode === 404) {
                console.log(`⚠️ File ${fileKey} not found in S3, skipping deletion`);
                return false;
            }
            // For other errors during check, throw exception
            console.error('S3 Head Error:', error);
        }

        // File exists, proceed with deletion
        try {
            const deleteCommand = new DeleteObjectCommand(params);
            await this.s3Client.send(deleteCommand);
            console.log(`✅ File ${fileKey} deleted successfully from S3`);
            return true;
        } catch (error) {
            console.error('S3 Delete Error:', error);
            throw new InternalServerErrorException('Error deleting file from S3');
        }
    }

    async getFile(fileKey: string) {
        // Extract key if full URL is provided
        const bucketUrl = `https://${this.bucketName}.s3.${this.region}.amazonaws.com/`;
        if (fileKey.startsWith(bucketUrl)) {
            fileKey = fileKey.replace(bucketUrl, '');
        }

        const params = {
            Bucket: this.bucketName,
            Key: fileKey,
        };

        try {
            const command = new GetObjectCommand(params);
            const response = await this.s3Client.send(command);
            return {
                stream: response.Body,
                contentType: response.ContentType,
            };
        } catch (error) {
            console.error('S3 Get Error:', error);
            throw new InternalServerErrorException('Error getting file from S3');
        }
    }

}