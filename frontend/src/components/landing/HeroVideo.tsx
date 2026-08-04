const metroVideoId = "IvqjZsAzGjQ";
const metroPosterUrl =
  "https://commons.wikimedia.org/wiki/Special:FilePath/Tren%20de%20la%20l%C3%ADnea%201%20del%20metro%20de%20Lima.jpg";

const metroVideoUrl = `https://www.youtube-nocookie.com/embed/${metroVideoId}?autoplay=1&mute=1&loop=1&playlist=${metroVideoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&fs=0&iv_load_policy=3`;

export function HeroVideo() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#05080D]" aria-hidden="true">
      <div
        className="absolute inset-0 bg-cover bg-[center_right] opacity-80 lg:bg-center"
        style={{ backgroundImage: `url(${metroPosterUrl})` }}
      />
      <div className="metro-video-frame hidden opacity-55 lg:block">
        <iframe
          title="Video real de la Linea 1 del Metro de Lima"
          src={metroVideoUrl}
          allow="autoplay; encrypted-media; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          tabIndex={-1}
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#05080D_0%,rgba(5,8,13,0.94)_24%,rgba(5,8,13,0.68)_47%,rgba(5,8,13,0.18)_72%,rgba(5,8,13,0.55)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,13,0.72)_0%,rgba(5,8,13,0.08)_38%,rgba(5,8,13,0.8)_88%,#05080D_100%)]" />
      <div className="absolute inset-0 backdrop-blur-[1.5px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_26%,rgba(0,166,81,0.2),transparent_28%),radial-gradient(circle_at_24%_78%,rgba(0,166,81,0.16),transparent_28%)]" />
    </div>
  );
}