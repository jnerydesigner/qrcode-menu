import { Test, TestingModule } from '@nestjs/testing';
import { S3UploadService } from './s3-upload.service';
import { S3ConfigService } from '@infra/config/s3.config';
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { InternalServerErrorException } from '@nestjs/common';

// Mock S3Client
jest.mock('@aws-sdk/client-s3', () => {
    const mS3Client = {
        send: jest.fn(),
    };
    return {
        S3Client: jest.fn(() => mS3Client),
        PutObjectCommand: jest.fn(),
        DeleteObjectCommand: jest.fn(),
    };
});

describe('S3UploadService', () => {
    let service: S3UploadService;
    let s3Client: S3Client;
    let s3ConfigService: S3ConfigService;

    const mockS3Config = {
        accessKeyId: 'test-access-key',
        secretAccessKey: 'test-secret-key',
        region: 'test-region',
        bucketName: 'test-bucket',
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                S3UploadService,
                {
                    provide: S3ConfigService,
                    useValue: {
                        getS3Config: jest.fn().mockReturnValue(mockS3Config),
                    },
                },
            ],
        }).compile();

        service = module.get<S3UploadService>(S3UploadService);
        s3ConfigService = module.get<S3ConfigService>(S3ConfigService);
        // @ts-ignore
        s3Client = service['s3Client'];
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('deleteFile', () => {
        it('should delete a file successfully', async () => {
            const fileKey = 'test-file-key';
            (s3Client.send as jest.Mock).mockResolvedValue({});

            await service.deleteFile(fileKey);

            expect(DeleteObjectCommand).toHaveBeenCalledWith({
                Bucket: mockS3Config.bucketName,
                Key: fileKey,
            });
            expect(s3Client.send).toHaveBeenCalled();
        });

        it('should throw InternalServerErrorException on error', async () => {
            const fileKey = 'test-file-key';
            (s3Client.send as jest.Mock).mockRejectedValue(new Error('S3 Error'));

            await expect(service.deleteFile(fileKey)).rejects.toThrow(
                InternalServerErrorException,
            );
        });
    });
});
