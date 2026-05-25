import { config } from 'dotenv';
import { join } from 'path';

/** Load root + service .env before Nest/Prisma start (Prisma reads process.env directly). */
export function bootstrapEnv(serviceDir: string): void {
  config({ path: join(process.cwd(), '.env') });
  config({ path: join(process.cwd(), 'src', serviceDir, '.env') });
}
