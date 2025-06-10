import React, { useState, useEffect, useRef } from 'react';
import { Heart, Users, Calendar, MessageCircle, Star, Trophy, MapPin, Clock, User, Settings, Bell, Search, Plus, Filter, X, Send, SkipForward } from 'lucide-react';

const Yukta = () => {
  const [currentZone, setCurrentZone] = useState('home');
  const [activeFilter, setActiveFilter] = useState('hot');
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showHostParty, setShowHostParty] = useState(false);
  const [showFamProfile, setShowFamProfile] = useState(false);
  const [selectedFamMember, setSelectedFamMember] = useState(null);
  const [showAddFam, setShowAddFam] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [likedParties, setLikedParties] = useState(new Set());
  const [joinedParties, setJoinedParties] = useState(new Set());
  const [sentPrompts, setSentPrompts] = useState(new Set());
  const [joystickActive, setJoystickActive] = useState(false);
  const [joystickPosition, setJoystickPosition] = useState({ x: 0, y: 0 });
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const joystickRef = useRef(null);

  const [user, setUser] = useState({
    name: 'Alex',
    auraScore: 850,
    partyScore: 1250,
    level: 'Party Legend',
    avatar: '👤',
    bio: 'Living life one party at a time ✨',
    age: 23,
    location: 'Mumbai'
  });

  const zones = [
    { id: 'home', name: 'Home', icon: '🏠' },
    { id: 'party', name: 'Life of the Party', icon: '🎉' },
    { id: 'aura', name: 'Fling', icon: '💕' },
    { id: 'friends', name: 'Fam Zone', icon: '👥' },
    { id: 'therapy', name: 'Healing Hub', icon: '🤗' }
  ];

  const [parties, setParties] = useState([
    {
      id: 1,
      title: "Neon Nights",
      host: "DJ Priya",
      date: "Sat, Jun 1",
      time: "10:00 PM",
      location: "Mumbai",
      attendees: 47,
      maxSlots: 60,
      vibe: "House Music",
      coverCharge: 800,
      stagWelcome: true,
      gradient: "from-purple-500 via-pink-500 to-red-500",
      category: "hot",
      genre: "electronic"
    },
    {
      id: 2,
      title: "Bollywood Bash",
      host: "Rohan's Crew",
      date: "Fri, May 31",
      time: "9:30 PM",
      location: "Delhi",
      attendees: 33,
      maxSlots: 45,
      vibe: "Bollywood Remix",
      coverCharge: 600,
      stagWelcome: true,
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      category: "nearby",
      genre: "bollywood"
    },
    {
      id: 3,
      title: "Rooftop Vibes",
      host: "Skyline Events",
      date: "Sun, Jun 2",
      time: "7:00 PM",
      location: "Bangalore",
      attendees: 28,
      maxSlots: 40,
      vibe: "Chill Acoustic",
      coverCharge: 500,
      stagWelcome: false,
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      category: "genre",
      genre: "acoustic"
    },
    {
      id: 4,
      title: "Stag Paradise",
      host: "Party Central",
      date: "Sat, Jun 1",
      time: "11:00 PM",
      location: "Mumbai",
      attendees: 52,
      maxSlots: 80,
      vibe: "Commercial Hits",
      coverCharge: 700,
      stagWelcome: true,
      gradient: "from-orange-500 via-red-500 to-pink-500",
      category: "stag",
      genre: "commercial"
    }
  ]);

  const [matches, setMatches] = useState([
    { 
      id: 1, 
      name: "Priya", 
      age: 22, 
      aura: 920, 
      prompt: "", 
      avatar: "👸", 
      bio: "Coffee enthusiast ☕ Adventure seeker 🌍 Dance lover 💃",
      interests: ["Coffee", "Travel", "Dancing"]
    },
    { 
      id: 2, 
      name: "Arjun", 
      age: 24, 
      aura: 750, 
      prompt: "", 
      avatar: "🤴", 
      bio: "Photographer 📸 Music producer 🎵 Foodie 🍕",
      interests: ["Photography", "Music", "Food"]
    },
    { 
      id: 3, 
      name: "Sneha", 
      age: 21, 
      aura: 890, 
      prompt: "", 
      avatar: "✨", 
      bio: "Artist 🎨 Dog mom 🐕 Yoga enthusiast 🧘‍♀️",
      interests: ["Art", "Dogs", "Yoga"]
    }
  ]);

  const prompts = [
    { id: 'rizz-up', text: "I'd rizz you up", direction: 'top', emoji: '💫', color: 'from-pink-500 to-rose-500' },
    { id: 'rizz-me', text: "Rizz me up", direction: 'right', emoji: '😏', color: 'from-purple-500 to-indigo-500' },
    { id: 'maybe', text: "Be my maybe", direction: 'left', emoji: '🤔', color: 'from-blue-500 to-cyan-500' },
    { id: 'prove-wrong', text: "Prove me wrong", direction: 'bottom', emoji: '⚡', color: 'from-orange-500 to-red-500' }
  ];

  const [famMembers] = useState([
    { id: 1, role: 'BFF', name: 'Riya', gradient: 'from-pink-500 to-rose-500', avatar: '👸', bio: 'My ride or die since college', age: 22, mutualFriends: 15 },
    { id: 2, role: 'GF', name: 'Priya', gradient: 'from-red-500 to-pink-500', avatar: '💕', bio: 'The love of my life ❤️', age: 21, mutualFriends: 8 },
    { id: 3, role: 'Bro', name: 'Arjun', gradient: 'from-blue-500 to-cyan-500', avatar: '🤴', bio: 'My photography partner in crime', age: 24, mutualFriends: 12 },
    { id: 4, role: 'Squad', name: 'Dance Crew', gradient: 'from-purple-500 to-indigo-500', avatar: '💃', bio: 'We move together, we groove together', age: '20-25', mutualFriends: 25 }
  ]);

  const [notifications] = useState([
    { id: 1, type: "party", message: "DJ Priya accepted your party request!", time: "2 min ago", unread: true },
    { id: 2, type: "aura", message: "Someone sent you 'I'd rizz you up' 💫", time: "5 min ago", unread: true },
    { id: 3, type: "friend", message: "Riya is now your BFF!", time: "1 hour ago", unread: false }
  ]);

  const filteredParties = parties.filter(party => {
    if (searchQuery) {
      return party.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             party.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
             party.vibe.toLowerCase().includes(searchQuery.toLowerCase());
    }
    
    switch(activeFilter) {
      case 'hot': return party.category === 'hot' || party.attendees > 40;
      case 'nearby': return party.location === user.location;
      case 'genre': return party.genre !== 'commercial';
      case 'stag': return party.stagWelcome;
      default: return true;
    }
  });

  const handleLikeParty = (partyId) => {
    const newLiked = new Set(likedParties);
    if (newLiked.has(partyId)) {
      newLiked.delete(partyId);
    } else {
      newLiked.add(partyId);
    }
    setLikedParties(newLiked);
  };

  const handleJoinParty = (partyId) => {
    const newJoined = new Set(joinedParties);
    if (newJoined.has(partyId)) {
      newJoined.delete(partyId);
    } else {
      newJoined.add(partyId);
      setParties(prev => prev.map(party => 
        party.id === partyId 
          ? { ...party, attendees: party.attendees + 1 }
          : party
      ));
      setUser(prev => ({ ...prev, partyScore: prev.partyScore + 50 }));
    }
    setJoinedParties(newJoined);
  };

  const handleSendPrompt = (matchId, promptType) => {
    setSentPrompts(prev => new Set([...prev, `${matchId}-${promptType}`]));
    setMatches(prev => prev.map(match => 
      match.id === matchId 
        ? { ...match, prompt: promptType }
        : match
    ));
    const scoreIncrease = promptType === 'rizz-up' ? 25 : promptType === 'rizz-me' ? 20 : 10;
    setUser(prev => ({ ...prev, auraScore: prev.auraScore + scoreIncrease }));
    
    // Move to next match after sending prompt
    setTimeout(() => {
      setCurrentMatchIndex((prev) => (prev + 1) % matches.length);
    }, 1000);
  };

  const handleViewFamMember = (member) => {
    setSelectedFamMember(member);
    setShowFamProfile(true);
  };

  // Joystick mechanics
  const handleJoystickStart = (e) => {
    e.preventDefault();
    setJoystickActive(true);
  };

  const handleJoystickMove = (e) => {
    if (!joystickActive || !joystickRef.current) return;
    
    const rect = joystickRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDistance = 40;
    
    if (distance <= maxDistance) {
      setJoystickPosition({ x: deltaX, y: deltaY });
      
      // Determine prompt based on direction
      const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
      let prompt = '';
      
      if (distance > 20) {
        if (angle >= -45 && angle <= 45) prompt = 'rizz-me'; // right
        else if (angle >= 45 && angle <= 135) prompt = 'prove-wrong'; // bottom
        else if (angle >= -135 && angle <= -45) prompt = 'rizz-up'; // top
        else prompt = 'maybe'; // left
      }
      
      setSelectedPrompt(prompt);
    }
  };

  const handleJoystickEnd = () => {
    if (selectedPrompt && joystickActive) {
      handleSendPrompt(matches[currentMatchIndex].id, selectedPrompt);
    }
    setJoystickActive(false);
    setJoystickPosition({ x: 0, y: 0 });
    setSelectedPrompt('');
  };

  const handleSkipMatch = () => {
    setCurrentMatchIndex((prev) => (prev + 1) % matches.length);
  };

  // Add event listeners for joystick
  useEffect(() => {
    const handleGlobalMove = (e) => handleJoystickMove(e);
    const handleGlobalEnd = () => handleJoystickEnd();

    if (joystickActive) {
      document.addEventListener('mousemove', handleGlobalMove);
      document.addEventListener('mouseup', handleGlobalEnd);
      document.addEventListener('touchmove', handleGlobalMove);
      document.addEventListener('touchend', handleGlobalEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMove);
      document.removeEventListener('mouseup', handleGlobalEnd);
      document.removeEventListener('touchmove', handleGlobalMove);
      document.removeEventListener('touchend', handleGlobalEnd);
    };
  }, [joystickActive]);

  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gray-900 rounded-3xl w-full max-w-md max-h-[80vh] overflow-y-auto border border-gray-700">
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <h2 className="text-xl font-bold text-white">{title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    );
  };

  const PartyCard = ({ party }) => (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
      <div className={`bg-gradient-to-r ${party.gradient} rounded-2xl p-5 mb-4 text-white relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg font-bold">{party.title}</h3>
              <p className="text-white/80 text-sm">by {party.host}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
              <span className="text-xs font-medium">{party.attendees}/{party.maxSlots}</span>
            </div>
          </div>
          
          <div className="space-y-1 text-sm text-white/90">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{party.date} • {party.time}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>{party.location}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <span className="bg-gray-800 px-3 py-1 rounded-full text-xs font-medium text-gray-300 border border-gray-700">{party.vibe}</span>
        <span className="text-green-400 font-bold">₹{party.coverCharge}</span>
      </div>
      
      {party.stagWelcome && (
        <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-2 mb-4 backdrop-blur-sm">
          <span className="text-green-400 text-xs font-medium">✅ Stag Friendly</span>
        </div>
      )}
      
      <div className="flex space-x-2">
        <button 
          onClick={() => handleJoinParty(party.id)}
          className={`flex-1 py-3 px-4 rounded-2xl font-medium transition-all duration-300 ${
            joinedParties.has(party.id)
              ? 'bg-green-600 text-white shadow-lg shadow-green-500/25'
              : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/25'
          }`}
        >
          {joinedParties.has(party.id) ? 'Joined ✓' : 'Join Party'}
        </button>
        <button 
          onClick={() => handleLikeParty(party.id)}
          className={`bg-gray-800 border border-gray-700 p-3 rounded-2xl transition-colors ${
            likedParties.has(party.id) ? 'text-red-400 border-red-500/30' : 'hover:bg-gray-700'
          }`}
        >
          <Heart className={`w-5 h-5 ${likedParties.has(party.id) ? 'fill-current' : 'text-gray-400'}`} />
        </button>
      </div>
    </div>
  );

  const JoystickController = () => {
    const currentMatch = matches[currentMatchIndex];
    if (!currentMatch) return null;

    return (
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Prompt indicators around joystick - only show when selected */}
        {prompts.map((prompt) => (
          selectedPrompt === prompt.id && (
            <div
              key={prompt.id}
              className={`absolute transition-all duration-300 opacity-90 pointer-events-none ${
                prompt.direction === 'top' ? '-top-12 left-1/2 transform -translate-x-1/2' :
                prompt.direction === 'right' ? 'right-8 top-1/2 transform -translate-y-1/2' :
                prompt.direction === 'bottom' ? '-bottom-12 left-1/2 transform -translate-x-1/2' :
                'left-8 top-1/2 transform -translate-y-1/2'
              }`}
            >
              <div className={`bg-gradient-to-r ${prompt.color} text-white px-3 py-2 rounded-2xl text-sm font-medium shadow-lg animate-pulse`}>
                <span className="mr-1">{prompt.emoji}</span>
                {prompt.text}
              </div>
            </div>
          )
        ))}

        {/* Joystick base */}
        <div 
          ref={joystickRef}
          className="relative w-24 h-24 bg-white rounded-full shadow-lg border-4 border-gray-200 flex items-center justify-center"
          onMouseDown={handleJoystickStart}
          onTouchStart={handleJoystickStart}
        >
          {/* Joystick knob */}
          <div
            className={`absolute w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-md transition-all duration-150 pointer-events-none ${
              joystickActive ? 'scale-110' : 'scale-100'
            }`}
            style={{
              transform: `translate(${joystickPosition.x}px, ${joystickPosition.y}px)`
            }}
          />
          
          {/* Skip button in center */}
          <button
            onClick={handleSkipMatch}
            className="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors z-10 pointer-events-auto"
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          >
            <SkipForward className="w-3 h-3 text-gray-600" />
          </button>
        </div>
      </div>
    );
  };

  const FlingMatchCard = ({ match }) => (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-700/50 hover:border-pink-500/50 transition-all duration-300">
      <div className="text-center mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-2xl mb-3 mx-auto shadow-lg shadow-pink-500/25">
          {match.avatar}
        </div>
        <h3 className="text-lg font-bold text-white">{match.name}, {match.age}</h3>
        <div className="flex items-center justify-center space-x-1 mt-1">
          <Star className="w-4 h-4 text-pink-400" />
          <span className="text-pink-400 font-medium text-sm">{match.aura} AURA</span>
        </div>
      </div>
      
      <p className="text-gray-400 text-sm text-center mb-4">{match.bio}</p>
      
      {/* Interests */}
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {match.interests.map((interest, index) => (
          <span key={index} className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs border border-gray-700">
            {interest}
          </span>
        ))}
      </div>

      {match.prompt ? (
        <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-3 text-center">
          <span className="text-green-400 text-sm font-medium">Prompt sent! ✓</span>
        </div>
      ) : (
        /* Joystick controller with more space */
        <div className="h-40 py-4 relative">
          <JoystickController />
        </div>
      )}
    </div>
  );

  const StatCard = ({ title, value, icon, gradient }) => (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50">
      <div className="flex items-center space-x-3">
        <div className={`w-10 h-10 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-lg`}>
          {icon}
        </div>
        <div>
          <div className="text-2xl font-bold text-white">{value}</div>
          <div className="text-gray-400 text-sm">{title}</div>
        </div>
      </div>
    </div>
  );

  const ZoneCard = ({ zone, onClick }) => (
    <div
      onClick={onClick}
      className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-6 rounded-3xl cursor-pointer hover:scale-105 hover:border-purple-500/50 transition-all duration-300 text-center group"
    >
      <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{zone.icon}</div>
      <h3 className="text-white font-bold text-sm">{zone.name}</h3>
    </div>
  );

  const renderZoneContent = () => {
    switch(currentZone) {
      case 'home':
        return (
          <div className="space-y-6">
            <div className="text-center py-6">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                Hey {user.name}! 👋
              </h1>
              <p className="text-gray-400">Ready to vibe tonight?</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <StatCard 
                title="AURA Score" 
                value={user.auraScore} 
                gradient="from-pink-500 to-rose-500"
                icon={<Star className="w-5 h-5 text-white" />}
              />
              <StatCard 
                title="Party Score" 
                value={user.partyScore} 
                gradient="from-purple-500 to-indigo-500"
                icon={<Trophy className="w-5 h-5 text-white" />}
              />
            </div>
            
            <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-3xl p-6 border border-purple-500/30 backdrop-blur-sm">
              <h2 className="text-lg font-bold text-white mb-2">Your Level</h2>
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl px-4 py-2 inline-block shadow-lg shadow-purple-500/25">
                <span className="text-white font-bold">{user.level}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {zones.slice(1, 5).map(zone => (
                <ZoneCard 
                  key={zone.id} 
                  zone={zone} 
                  onClick={() => setCurrentZone(zone.id)}
                />
              ))}
            </div>
          </div>
        );

      case 'party':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Life of the Party</h1>
                <p className="text-gray-400 text-sm">Find your vibe, find your tribe</p>
              </div>
              <button 
                onClick={() => setShowHostParty(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-2xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-2">
              <button 
                onClick={() => setActiveFilter('hot')}
                className={`py-3 px-4 rounded-2xl font-medium text-sm flex items-center justify-center space-x-2 transition-all duration-300 ${
                  activeFilter === 'hot' 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25' 
                    : 'bg-gray-800/50 border border-gray-700/50 text-gray-300 hover:bg-gray-700/50'
                }`}
              >
                <span>🔥</span>
                <span>Hot Parties</span>
              </button>
              <button 
                onClick={() => setActiveFilter('nearby')}
                className={`py-3 px-4 rounded-2xl font-medium text-sm flex items-center justify-center space-x-2 transition-all duration-300 ${
                  activeFilter === 'nearby' 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25' 
                    : 'bg-gray-800/50 border border-gray-700/50 text-gray-300 hover:bg-gray-700/50'
                }`}
              >
                <span>📍</span>
                <span>Near Me</span>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setActiveFilter('genre')}
                className={`py-3 px-4 rounded-2xl font-medium text-sm flex items-center justify-center space-x-2 transition-all duration-300 ${
                  activeFilter === 'genre' 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25' 
                    : 'bg-gray-800/50 border border-gray-700/50 text-gray-300 hover:bg-gray-700/50'
                }`}
              >
                <span>🎵</span>
                <span>By Genre</span>
              </button>
              <button 
                onClick={() => setActiveFilter('stag')}
                className={`py-3 px-4 rounded-2xl font-medium text-sm flex items-center justify-center space-x-2 transition-all duration-300 ${
                  activeFilter === 'stag' 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25' 
                    : 'bg-gray-800/50 border border-gray-700/50 text-gray-300 hover:bg-gray-700/50'
                }`}
              >
                <span>👥</span>
                <span>Stag Friendly</span>
              </button>
            </div>
            
            <div className="grid gap-4">
              {filteredParties.map(party => (
                <PartyCard key={party.id} party={party} />
              ))}
            </div>
            
            <button 
              onClick={() => setShowHostParty(true)}
              className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-4 px-6 rounded-3xl font-bold hover:shadow-lg hover:shadow-purple-500/40 transition-all duration-300"
            >
              🎊 Host Your Party
            </button>
          </div>
        );

      case 'aura':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent mb-1">Fling</h1>
              <p className="text-gray-400 text-sm mb-4">Where vibes meet hearts</p>
              <div className="bg-pink-900/30 border border-pink-500/30 rounded-2xl p-4 inline-block backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-pink-400" />
                  <span className="text-pink-400 font-bold">{user.auraScore} AURA</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-400 text-sm">Rank #247</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button className="flex-1 bg-gradient-to-r from-pink-600 to-rose-600 text-white py-3 px-6 rounded-2xl font-medium shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all duration-300">
                🎯 Smart Match
              </button>
              <button className="flex-1 bg-gray-800 border border-gray-700 text-gray-300 py-3 px-6 rounded-2xl font-medium hover:bg-gray-700 transition-colors">
                🎲 Random Vibes
              </button>
            </div>
            
            <div className="grid gap-4">
              <FlingMatchCard match={matches[currentMatchIndex]} />
            </div>
          </div>
        );

      case 'friends':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent mb-1">Fam Zone</h1>
              <p className="text-gray-400 text-sm">Your chosen family</p>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-700/50">
              <h2 className="text-lg font-bold text-white mb-4">Your Fam (12)</h2>
              <div className="grid grid-cols-2 gap-3">
                {famMembers.map((member) => (
                  <div 
                    key={member.id} 
                    onClick={() => handleViewFamMember(member)}
                    className={`bg-gradient-to-br ${member.gradient} p-3 rounded-2xl text-center text-white shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300`}
                  >
                    <div className="font-medium text-sm">{member.role}</div>
                    <div className="text-xs opacity-75">{member.name}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              onClick={() => setShowAddFam(true)}
              className="w-full bg-gradient-to-r from-green-600 to-cyan-600 text-white py-4 px-6 rounded-3xl font-bold shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300"
            >
              🔍 Add More People to Your Fam
            </button>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚧</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Coming Soon!</h2>
            <p className="text-gray-400">This zone is under construction</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <header className="sticky top-0 bg-black/80 backdrop-blur-lg border-b border-gray-800/50 z-50">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Yukta
          </div>
          
          <div className="flex items-center space-x-3">
            <div 
              onClick={() => setShowSearch(true)}
              className="bg-gray-800 border border-gray-700 p-2 rounded-full hover:bg-gray-700 transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5 text-gray-300" />
            </div>
            <div 
              onClick={() => setShowNotifications(true)}
              className="bg-gray-800 border border-gray-700 p-2 rounded-full hover:bg-gray-700 transition-colors cursor-pointer relative"
            >
              <Bell className="w-5 h-5 text-gray-300" />
              {notifications.some(n => n.unread) && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              )}
            </div>
            <div 
              onClick={() => setShowProfile(true)}
              className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/25 cursor-pointer"
            >
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6 pb-24">
        {renderZoneContent()}
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-gray-800/50">
        <div className="max-w-md mx-auto px-2">
          <div className="flex justify-between items-center py-2">
            {zones.slice(0, 5).map(zone => (
              <button
                key={zone.id}
                onClick={() => setCurrentZone(zone.id)}
                className={`flex flex-col items-center p-3 rounded-2xl transition-all duration-300 min-w-[60px] ${
                  currentZone === zone.id 
                    ? 'bg-gradient-to-t from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-purple-400 shadow-lg shadow-purple-500/20' 
                    : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/50'
                }`}
              >
                <span className="text-xl mb-1">{zone.icon}</span>
                <span className="text-xs font-medium">{zone.id === 'aura' ? 'Fling' : zone.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal isOpen={showProfile} onClose={() => setShowProfile(false)} title="Your Profile">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg shadow-purple-500/25">
            {user.avatar}
          </div>
          <h3 className="text-xl font-bold text-white">{user.name}, {user.age}</h3>
          <p className="text-gray-400 text-sm mt-1">{user.bio}</p>
          <div className="flex items-center justify-center space-x-4 mt-3">
            <div className="text-center">
              <div className="text-lg font-bold text-pink-400">{user.auraScore}</div>
              <div className="text-xs text-gray-400">AURA</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-400">{user.partyScore}</div>
              <div className="text-xs text-gray-400">Party</div>
            </div>
          </div>
        </div>
        <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-2xl font-medium">
          Edit Profile
        </button>
      </Modal>

      <Modal isOpen={showNotifications} onClose={() => setShowNotifications(false)} title="Notifications">
        <div className="space-y-3">
          {notifications.map(notification => (
            <div key={notification.id} className={`p-4 rounded-2xl border ${
              notification.unread 
                ? 'bg-purple-900/20 border-purple-500/30' 
                : 'bg-gray-800/50 border-gray-700/50'
            }`}>
              <p className="text-white text-sm">{notification.message}</p>
              <p className="text-gray-400 text-xs mt-1">{notification.time}</p>
            </div>
          ))}
        </div>
      </Modal>

      <Modal isOpen={showSearch} onClose={() => setShowSearch(false)} title="Search">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search parties, events, people..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
          />
        </div>
        {searchQuery && (
          <div className="space-y-3">
            <h3 className="text-white font-medium">Search Results</h3>
            {filteredParties.slice(0, 3).map(party => (
              <div key={party.id} className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-3">
                <h4 className="text-white font-medium">{party.title}</h4>
                <p className="text-gray-400 text-sm">{party.location} • {party.date}</p>
              </div>
            ))}
          </div>
        )}
      </Modal>

      <Modal isOpen={showHostParty} onClose={() => setShowHostParty(false)} title="Host Your Party">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Party Title"
            className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
          />
          <input
            type="text"
            placeholder="Location"
            className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="date"
              className="bg-gray-800 border border-gray-700 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-purple-500"
            />
            <input
              type="time"
              className="bg-gray-800 border border-gray-700 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-purple-500"
            />
          </div>
          <input
            type="number"
            placeholder="Cover Charge (₹)"
            className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
          />
          <textarea
            placeholder="Describe your party vibe..."
            rows="3"
            className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 resize-none"
          />
          <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-2xl font-bold">
            Create Party 🎉
          </button>
        </div>
      </Modal>

      <Modal isOpen={showFamProfile} onClose={() => setShowFamProfile(false)} title="Fam Member">
        {selectedFamMember && (
          <div className="text-center">
            <div className={`w-20 h-20 bg-gradient-to-br ${selectedFamMember.gradient} rounded-full flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg`}>
              {selectedFamMember.avatar}
            </div>
            <h3 className="text-xl font-bold text-white">{selectedFamMember.name}</h3>
            <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium text-white mt-2 bg-gradient-to-r ${selectedFamMember.gradient}`}>
              {selectedFamMember.role}
            </div>
            <p className="text-gray-400 text-sm mt-3 mb-4">{selectedFamMember.bio}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-800/50 rounded-2xl p-3 text-center">
                <div className="text-lg font-bold text-white">{selectedFamMember.mutualFriends}</div>
                <div className="text-xs text-gray-400">Mutual Friends</div>
              </div>
              <div className="bg-gray-800/50 rounded-2xl p-3 text-center">
                <div className="text-lg font-bold text-white">{typeof selectedFamMember.age === 'string' ? selectedFamMember.age : `${selectedFamMember.age} years`}</div>
                <div className="text-xs text-gray-400">Age</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-2xl font-medium">
                💬 Message
              </button>
              <button className="w-full bg-gray-800 border border-gray-700 text-gray-300 py-3 rounded-2xl font-medium hover:bg-gray-700 transition-colors">
                👀 View Profile
              </button>
              {selectedFamMember.role !== 'GF' && (
                <button className="w-full bg-red-900/30 border border-red-500/30 text-red-400 py-3 rounded-2xl font-medium hover:bg-red-900/50 transition-colors">
                  💔 Remove from Fam
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={showAddFam} onClose={() => setShowAddFam(false)} title="Add to Your Fam">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Search people by name or username..."
            className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
          />
          
          <div className="space-y-3">
            <h3 className="text-white font-medium">Suggested People</h3>
            {[
              { name: 'Kavya', mutual: 8, avatar: '👩', status: 'online' },
              { name: 'Rohit', mutual: 5, avatar: '👨', status: 'offline' },
              { name: 'Ananya', mutual: 12, avatar: '🙋‍♀️', status: 'online' }
            ].map((person, i) => (
              <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-lg">
                    {person.avatar}
                  </div>
                  <div>
                    <div className="text-white font-medium">{person.name}</div>
                    <div className="text-gray-400 text-xs">{person.mutual} mutual friends</div>
                  </div>
                </div>
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-xl font-medium text-sm">
                  Add
                </button>
              </div>
            ))}
          </div>
          
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-2xl p-4">
            <h4 className="text-purple-400 font-medium mb-2">💡 Pro Tip</h4>
            <p className="text-gray-400 text-sm">You can assign different roles like BFF, Bro, Squad, or create custom ones when you add someone!</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Yukta;