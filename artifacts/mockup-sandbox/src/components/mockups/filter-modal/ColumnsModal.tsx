import { useState } from "react";
import { X, Check, SlidersHorizontal } from "lucide-react";

const FILTER_GENRES = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Thriller', 'Romance', 'Documentary', 'Animation', 'Crime'];
const FILTER_SUBTITLES = ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese'];
const FILTER_CHANNELS = ['AXIS Originals', 'Sky Sports', 'BBC', 'ITV', 'Channel 4', 'HBO', 'Showtime', 'Paramount+', 'Discovery', 'Eurosport'];
const FILTER_TYPES = ['Movies', 'TV Shows', 'Videos', 'Shorts', 'Playlists', 'Channels'];
const FILTER_DURATIONS = ['Under 30 minutes', '30-60 minutes', 'Over 60 minutes'];
const FILTER_UPLOAD_DATES = ['Today', 'This week', 'This month', 'This year'];
const FILTER_PRIORITY = ['Relevance', 'Popularity'];

function CheckboxItem({ label, checked, onClick }: { label: string; checked: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center gap-2.5 py-1.5 text-sm text-left w-full group">
      <div
        className="w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors"
        style={{
          borderColor: checked ? '#4a6af7' : 'rgba(255,255,255,0.25)',
          background: checked ? '#4a6af7' : 'transparent',
        }}
      >
        {checked && <Check className="w-3 h-3 text-white" />}
      </div>
      <span style={{ color: checked ? '#fff' : 'rgba(255,255,255,0.7)' }} className="group-hover:text-white transition-colors">{label}</span>
    </button>
  );
}

function RadioItem({ label, checked, onClick }: { label: string; checked: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center gap-2.5 py-1.5 text-sm text-left w-full group">
      <div
        className="w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors"
        style={{ borderColor: checked ? '#4a6af7' : 'rgba(255,255,255,0.25)' }}
      >
        {checked && <div className="w-2 h-2 rounded-full" style={{ background: '#4a6af7' }} />}
      </div>
      <span style={{ color: checked ? '#fff' : 'rgba(255,255,255,0.7)' }} className="group-hover:text-white transition-colors">{label}</span>
    </button>
  );
}

function ColumnSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex-1 min-w-0">
      <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'rgba(255,255,255,0.45)' }}>{title}</h3>
      <div className="flex flex-col">{children}</div>
    </div>
  );
}

export function ColumnsModal() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>(['Drama', 'Thriller']);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [selectedSubtitles, setSelectedSubtitles] = useState<string[]>([]);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [selectedUploadDate, setSelectedUploadDate] = useState<string | null>(null);
  const [priority, setPriority] = useState<string>('Relevance');
  const [freeToMe, setFreeToMe] = useState(false);

  const toggle = (item: string, list: string[], setList: (v: string[]) => void) => {
    setList(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);
  };

  const activeCount = selectedTypes.length + selectedGenres.length + selectedChannels.length + selectedSubtitles.length + (selectedDuration ? 1 : 0) + (selectedUploadDate ? 1 : 0) + (freeToMe ? 1 : 0);

  const clearAll = () => {
    setSelectedTypes([]);
    setSelectedGenres([]);
    setSelectedChannels([]);
    setSelectedSubtitles([]);
    setSelectedDuration(null);
    setSelectedUploadDate(null);
    setPriority('Relevance');
    setFreeToMe(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: '#141414' }}>
      <div className="fixed inset-0" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }} />

      <div
        className="relative w-full max-w-3xl rounded-2xl overflow-hidden"
        style={{
          background: '#1e1e1e',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
        }}
      >
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-center gap-3">
            <SlidersHorizontal className="w-5 h-5" style={{ color: '#4a6af7' }} />
            <h2 className="text-lg font-bold text-white">Filters</h2>
            {activeCount > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full text-white font-medium" style={{ background: '#4a6af7' }}>
                {activeCount} active
              </span>
            )}
          </div>
          <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>

        <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <span className="text-sm font-semibold text-white">Free to me</span>
          <button
            onClick={() => setFreeToMe(!freeToMe)}
            className="w-11 h-6 rounded-full transition-colors relative"
            style={{ background: freeToMe ? '#4a6af7' : 'rgba(255,255,255,0.15)' }}
          >
            <div
              className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all"
              style={{ left: freeToMe ? '24px' : '4px' }}
            />
          </button>
        </div>

        <div className="px-6 py-5 grid grid-cols-4 gap-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <ColumnSection title="Type">
            {FILTER_TYPES.map(item => (
              <CheckboxItem key={item} label={item} checked={selectedTypes.includes(item)} onClick={() => toggle(item, selectedTypes, setSelectedTypes)} />
            ))}
          </ColumnSection>

          <ColumnSection title="Genres">
            {FILTER_GENRES.map(item => (
              <CheckboxItem key={item} label={item} checked={selectedGenres.includes(item)} onClick={() => toggle(item, selectedGenres, setSelectedGenres)} />
            ))}
          </ColumnSection>

          <ColumnSection title="Channels">
            {FILTER_CHANNELS.map(item => (
              <CheckboxItem key={item} label={item} checked={selectedChannels.includes(item)} onClick={() => toggle(item, selectedChannels, setSelectedChannels)} />
            ))}
          </ColumnSection>

          <ColumnSection title="Subtitles">
            {FILTER_SUBTITLES.map(item => (
              <CheckboxItem key={item} label={item} checked={selectedSubtitles.includes(item)} onClick={() => toggle(item, selectedSubtitles, setSelectedSubtitles)} />
            ))}
          </ColumnSection>
        </div>

        <div className="px-6 py-5 grid grid-cols-4 gap-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <ColumnSection title="Duration">
            {FILTER_DURATIONS.map(item => (
              <RadioItem key={item} label={item} checked={selectedDuration === item} onClick={() => setSelectedDuration(selectedDuration === item ? null : item)} />
            ))}
          </ColumnSection>

          <ColumnSection title="Upload date">
            {FILTER_UPLOAD_DATES.map(item => (
              <RadioItem key={item} label={item} checked={selectedUploadDate === item} onClick={() => setSelectedUploadDate(selectedUploadDate === item ? null : item)} />
            ))}
          </ColumnSection>

          <ColumnSection title="Prioritise by">
            {FILTER_PRIORITY.map(item => (
              <RadioItem key={item} label={item} checked={priority === item} onClick={() => setPriority(item)} />
            ))}
          </ColumnSection>

          <div />
        </div>

        <div className="flex items-center justify-between px-6 py-4">
          <button
            onClick={clearAll}
            className="text-sm font-medium transition-colors hover:text-white"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            Clear all
          </button>
          <div className="flex items-center gap-3">
            <button className="px-5 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors">
              Cancel
            </button>
            <button
              className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white transition-colors hover:opacity-90"
              style={{ background: '#4a6af7' }}
            >
              Show results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
