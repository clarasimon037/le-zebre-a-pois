import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

interface ReservationRequest {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  message?: string;
}

export async function POST(request: Request) {
  try {
    const body: ReservationRequest = await request.json();

    // Validate required fields
    const { name, email, phone, date, time, guests, message } = body;

    if (!name || !email || !phone || !date || !time || !guests) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Format d\'email invalide' },
        { status: 400 }
      );
    }

    // Validate phone format (French phone numbers)
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      return NextResponse.json(
        { error: 'Format de téléphone invalide' },
        { status: 400 }
      );
    }

    // Validate date is not in the past
    const reservationDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (reservationDate < today) {
      return NextResponse.json(
        { error: 'La date de réservation ne peut pas être dans le passé' },
        { status: 400 }
      );
    }

    // Validate time is within opening hours
    const validTimes = ['12:00', '12:30', '13:00', '13:30', '19:00', '19:30', '20:00'];
    if (!validTimes.includes(time)) {
      return NextResponse.json(
        { error: 'Heure de réservation invalide' },
        { status: 400 }
      );
    }

    // Validate date is not Monday or Sunday (closed days)
    const dayOfWeek = reservationDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 1) {
      return NextResponse.json(
        { error: 'Le restaurant est fermé le dimanche et le lundi' },
        { status: 400 }
      );
    }

    // Create reservation in database
    const reservation = await db.reservation.create({
      data: {
        name,
        email,
        phone,
        date,
        time,
        guests: parseInt(guests, 10),
        message: message || null,
        status: 'pending',
      },
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Réservation enregistrée avec succès',
        reservation: {
          id: reservation.id,
          name: reservation.name,
          date: reservation.date,
          time: reservation.time,
          guests: reservation.guests,
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Reservation error:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la réservation' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const reservations = await db.reservation.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 50,
    });

    return NextResponse.json({ reservations });
  } catch (error) {
    console.error('Fetch reservations error:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la récupération des réservations' },
      { status: 500 }
    );
  }
}
