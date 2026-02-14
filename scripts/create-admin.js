const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    // Check if admin exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@sdp.com' },
    });

    if (existingAdmin) {
      console.log('✅ Admin user already exists!');
      console.log('Email: admin@sdp.com');
      console.log('Password: admin123');
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        email: 'admin@sdp.com',
        name: 'Admin',
        password: hashedPassword,
        role: 'admin',
      },
    });

    console.log('✅ Admin user created successfully!');
    console.log('');
    console.log('Admin Credentials:');
    console.log('==================');
    console.log('Email: admin@sdp.com');
    console.log('Password: admin123');
    console.log('');
    console.log('⚠️  Please change the password after first login!');
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();
