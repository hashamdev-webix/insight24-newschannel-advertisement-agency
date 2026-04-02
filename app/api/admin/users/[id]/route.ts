import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { getTokenFromRequest } from '@/lib/auth';

interface Params { params: Promise<{ id: string }> }

function requireAdmin(req: NextRequest) {
  const payload = getTokenFromRequest(req);
  if (!payload || payload.role !== 'admin') return null;
  return payload;
}

// PUT /api/admin/users/:id — update user
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const admin = requireAdmin(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const { id } = await params;
    const { name, email, role, password } = await req.json();

    const user = await User.findById(id);
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    // Prevent demoting yourself
    if (user._id.toString() === admin.userId && role && role !== 'admin') {
      return NextResponse.json({ error: 'Cannot change your own role' }, { status: 400 });
    }

    if (name) user.name = name;
    if (email) user.email = email.toLowerCase();
    if (role) user.role = role;
    if (password && password.length >= 6) user.password = password;

    await user.save();
    const safe = user.toJSON();
    return NextResponse.json({ user: safe });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

// DELETE /api/admin/users/:id
export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const admin = requireAdmin(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const { id } = await params;

    if (id === admin.userId) {
      return NextResponse.json({ error: 'Cannot delete your own account' }, { status: 400 });
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    return NextResponse.json({ message: 'User deleted' });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
