export function Footer() {
  return (
    <footer class="mt-auto pt-4 text-center text-sm text-slate-500 dark:text-slate-400">
      <p>
        © {new Date().getFullYear()} -{" "}
        <a href="https://lzart.com.br" class="hover:underline" target="_blank">
          Desenvolvido por LZArt
        </a>
      </p>
    </footer>
  );
}
