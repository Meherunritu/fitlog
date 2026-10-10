import {Suspense} from 'react';
import {WorkoutDetails} from '../../components/workout-details';
export const metadata={title:'Workout Details — FitLog'};
export default function Page(){return <Suspense fallback={<div className="container page">Loading workouts…</div>}><WorkoutDetails/></Suspense>;}
