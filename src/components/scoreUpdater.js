import React, { useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const ScoreUpdater = () => {
  const [gameId, setGameId] = useState("");
  const [inputScores, setInputScores] = useState({ teamA: "0", teamB: "0" });
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [deleteStatus, setDeleteStatus] = useState(null);

  const handleDeleteData = async () => {
    try {
      const response = await axios.delete('https://illumina-backend.onrender.com/deleteStoredData');
      setDeleteStatus(response.data);
    } catch (error) {
      console.error('Error deleting stored data:', error);
      setDeleteStatus({ success: false, message: 'Error deleting stored data.' });
    }
  };

  const updateScores = () => {
    const socket = io('https://illumina-backend.onrender.com');
    const updatedScores = { teamA: inputScores.teamA, teamB: inputScores.teamB };
    const teams = { t1: teamA, t2: teamB };
    socket.emit('updateScore', { gameId, scores: updatedScores, teams });
  };

  const handleInputChange = (team, value) => {
    setInputScores((prevInputScores) => ({
      ...prevInputScores,
      [team]: value,
    }));
  };

  const handleGameIdChange = (e) => {
    setGameId(e.target.value);
  };
  const handleTeamAChange = (e) => {
    setTeamA(e.target.value);
  };
  const handleTeamBChange = (e) => {
    setTeamB(e.target.value);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center", justifyContent: "center", maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h3>Score Updater</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <label>
          Select Game:
          <select value={gameId} onChange={handleGameIdChange}>
            <option value="">Select a game</option>
            <option value="football">Football</option>
            <option value="volleyball">Volleyball</option>
            <option value="cricket">Cricket</option>
            <option value="khokho">Kho Kho</option>
            <option value="kabbadi">Kabbadi</option>
            <option value="badminton">Badminton</option>
            {/* Add more options as needed */}
          </select>
        </label>
        <label>
          Select TeamA:
          <select value={teamA} onChange={handleTeamAChange}>
            <option value="">Select a team</option>
            <option value="Pragati">Pragati</option>
            <option value="Shakti">Shakti</option>
            <option value="Shanti">Shanti</option>
            <option value="Maitri">Maitri</option>
          </select>
        </label>
        <label>
          Select TeamB:
          <select value={teamB} onChange={handleTeamBChange}>
            <option value="">Select a team</option>
            <option value="Pragati">Pragati</option>
            <option value="Shakti">Shakti</option>
            <option value="Shanti">Shanti</option>
            <option value="Maitri">Maitri</option>
          </select>
        </label>
      </div>
      {gameId && teamA && teamB && (
        <>
          <p>Selected Game: {gameId}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <label>
              {teamA}:
              <input
                type="string"
                value={inputScores.teamA}
                onChange={(e) => handleInputChange('teamA', e.target.value)}
              />
            </label>
            <label>
              {teamB}:
              <input
                type="string"
                value={inputScores.teamB}
                onChange={(e) => handleInputChange('teamB', e.target.value)}
              />
            </label>
          </div>
          <button style={{ width: "100%", maxWidth: "150px" }} onClick={updateScores}>Update Scores</button>
        </>
      )}
      <button style={{ width: "100%", maxWidth: "150px" }} onClick={handleDeleteData}>Reset all scores</button>
      {deleteStatus && (
        <div style={{ textAlign: "center" }}>
          <p>Status: {deleteStatus.success ? 'Success' : 'Failure'}</p>
          <p>{deleteStatus.message}</p>
        </div>
      )}
    </div>
  );
};

export default ScoreUpdater;
