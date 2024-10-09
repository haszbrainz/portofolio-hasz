"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebaseConfig";
import './css/custom.css';

interface UserData {
  facebook: string;
  instagram: string;
  linkedin: string;
  whatsapp: string;
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSocial, setSelectedSocial] = useState<string | null>(null); // State untuk menyimpan data sosial media yang dipilih

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const data = querySnapshot.docs.map((doc) => doc.data() as UserData);
        if (data.length > 0) {
          setUserData(data[0]);
        } else {
          setError("No user data found");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSocialClick = (platform: string) => {
    setSelectedSocial(platform); // Mengubah state saat salah satu logo diklik
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="desktop">
        <div className="frame-wrapper">
          <div className="frame">
            <div className="div">
              <img className="group" src="/group-1.png" alt="Profile" />
            </div>
            <div className="frame-2">
              <div className="frame-3">
                <div className="text-wrapper">Muchammad Hasbi Ashshiddiqi</div>
                <div className="text-wrapper-2">5220411414</div>
              </div>
              <div className="hi-saya-muchammad-wrapper">
                <p className="hi-saya-muchammad">
                  Hi, saya Muchammad Hasbi Ashshiddiqi, biasa dipanggil Abi,
                  <br />
                  saya adalah mahasiswa prodi informatika angkatan 22, hobi saya bulu tangkis dan bermain game.
                </p>
              </div>
              {userData && (
                <div className="social-icons">
                  <img
                    className="icon"
                    src="/whatsapp.png"
                    alt="WhatsApp"
                    onClick={() => handleSocialClick("whatsapp")}
                  />
                  <img
                    className="icon"
                    src="/linkedin.png"
                    alt="LinkedIn"
                    onClick={() => handleSocialClick("linkedin")}
                  />
                  <img
                    className="icon"
                    src="/instagram.png"
                    alt="Instagram"
                    onClick={() => handleSocialClick("instagram")}
                  />
                  <img
                    className="icon"
                    src="/facebook.png"
                    alt="Facebook"
                    onClick={() => handleSocialClick("facebook")}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="usernames">
            {selectedSocial && userData && (
              <p id="social-output">
                {selectedSocial === "whatsapp" && `WhatsApp: ${userData.whatsapp}`}
                {selectedSocial === "linkedin" && `LinkedIn: ${userData.linkedin}`}
                {selectedSocial === "instagram" && `Instagram: ${userData.instagram}`}
                {selectedSocial === "facebook" && `Facebook: ${userData.facebook}`}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
