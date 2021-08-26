import { FastifyRequest } from 'fastify';
import JSZip from "jszip";
import fs from 'fs-extra';
import path from 'path';

async function extractFiles(request: FastifyRequest) {
	const file = await request.file();
	if (file.fields.gitRepo !== undefined) {
		const link = file.fields.gitRepo;
		return {
			async saveFilesToDisk(directoryPath: string) {},
			async uploadFilesToS3(bundleId: string) {},
		};
	} else {
		return {
			async saveFilesToDisk(directoryPath: string) {
				const zip = await JSZip.loadAsync(await file.toBuffer());
				for (const filename in zip.files) {
					await fs.writeFile(
						path.join(directoryPath, filename),
						await zip.files[filename].async("nodebuffer"),
					);
				}
			},
			async uploadFilesToS3(bundleId: string) {},
		};
	}
}

export default { extractFiles };
