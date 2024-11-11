document.addEventListener("DOMContentLoaded", () => {
    const observer: IntersectionObserver = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            } else {
                entry.target.classList.remove('in-view');
            }
        });
    });

    const allAnimatedElements: NodeListOf<HTMLElement> = document.querySelectorAll('.animate');

    allAnimatedElements.forEach((element: HTMLElement) => observer.observe(element));
});
