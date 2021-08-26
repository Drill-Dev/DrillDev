import { FastifyRequest } from 'fastify';
import fs from 'fs-extra';
import JSZip from 'jszip';
import path from 'path';

export async function extractFiles(request: FastifyRequest) {
	const file = await request.file();
	if (file.fields.gitRepo !== undefined) {
		const _link = file.fields.gitRepo;
		return {
			async saveFilesToDisk(_directoryPath: string) { /* TODO */ },
			async uploadFilesToS3(_bundleId: string) { /* TODO */ },
		};
	} else {
		return {
			async saveFilesToDisk(directoryPath: string) {
				const zip = await JSZip.loadAsync(await file.toBuffer());
				for (const filename in zip.files) {
					await fs.writeFile(
						path.join(directoryPath, filename),
						await zip.files[filename].async('nodebuffer')
					);
				}
			},
		async uploadFilesToS3(_bundleId: string) { /* TODO */ },
		};
	}
}
