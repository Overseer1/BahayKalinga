import supabase from "../config/supabaseClient";

const fetchAppointmentVisitorsByAppointmentId = async (appointmentId) => {
    if (!appointmentId) {
        throw new Error("appointmentId is required");
    }

    const { data, error } = await supabase
        .from("AppointmentVisitors")
        .select("*")
        .eq("appointment_id", appointmentId);

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export default fetchAppointmentVisitorsByAppointmentId;